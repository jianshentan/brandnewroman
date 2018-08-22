import jinja2
from flask import (
  g, Blueprint, render_template, jsonify, request, 
  redirect, url_for
)
from .forms import SubscribeForm
from .mailchimp import mc
bp = Blueprint('main', __name__)

import base64
import sendgrid
import os
import urllib.request as urllib
from urllib.parse import quote
from sendgrid.helpers.mail import Email, Content, Mail, Attachment

@bp.route('/')
def index():
  return redirect(url_for('.custom'))

    
@bp.route('/c/', defaults={'text': None})
@bp.route('/c/<text>')
def custom(text):
  if text == None:
    return render_template('index.html')
  else:
    return render_template('index.html', text=text)


@bp.route('/about')
def about():
  return render_template('about.html')


@bp.route('/subscribe', methods=['POST', 'GET'])
def email():
  if request.method == "POST":
    form = SubscribeForm(request.form, csrf_enabled=False)

    if form.validate():
      # add email to subscribe list with mailchimp
      success, msg = mc.add_or_update_user(\
        email=form.email.data,
        first_name=form.firstname.data,
        last_name=form.lastname.data)
        
      if not success:
        return jsonify(success=False, errors=msg)

      else:

        # use sendgrid to send email with font attachment
        sg = sendgrid.SendGridAPIClient(apikey=os.environ.get('SENDGRID_API_KEY'))
        from_email = Email("friend@hellovelocity.com")
        subject = "Brand New Roman - A New Font For You!"
        to_email = Email(form.email.data)

        # load 'download_email.html' to use as html
        templateLoader = jinja2.FileSystemLoader(searchpath="./")
        templateEnv = jinja2.Environment(loader=templateLoader)
        TEMPLATE_FILE = "download_email.html"
        template = templateEnv.get_template(TEMPLATE_FILE)
        outputText = template.render()

        content = Content("text/html", outputText)

        # add attachments
        file_path = "brand-new-roman.zip"
        with open(file_path,'rb') as f:
          data = f.read()
          f.close()
        encoded = base64.b64encode(data).decode()

        attachment = Attachment()
        attachment.content = encoded
        # attachment.type = "application/pdf"
        attachment.filename = "brand-new-roman.zip"
        attachment.disposition = "attachment"
        attachment.content_id = "brandnewroman"

        mail = Mail(from_email, subject, to_email, content)
        mail.add_attachment(attachment)
        try:
          response = sg.client.mail.send.post(request_body=mail.get())
        except urllib.HTTPError as e:
          print(e.read())
          exit()

        print(response.status_code)
        print(response.body)
        print(response.headers)

      return jsonify(success=True)

    else:
      return jsonify(success=False, errors="Invalid Email Address")


