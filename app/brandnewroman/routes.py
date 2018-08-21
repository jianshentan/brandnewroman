from flask import Blueprint, render_template, redirect, url_for, request, jsonify
from validate_email import validate_email
import jinja2
bp = Blueprint('main', __name__)

import base64
import sendgrid
import os
import urllib.request as urllib
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


@bp.route('/download', methods=['POST', 'GET'])
def email():
  if request.method == "POST":
    data = request.form
    user_email = data.get('email')
    if validate_email(user_email):
      sg = sendgrid.SendGridAPIClient(apikey=os.environ.get('SENDGRID_API_KEY'))
      from_email = Email("friend@hellovelocity.com")
      subject = "Brand New Roman - A New Font For You!"
      to_email = Email(user_email)

      templateLoader = jinja2.FileSystemLoader(searchpath="./")
      templateEnv = jinja2.Environment(loader=templateLoader)
      TEMPLATE_FILE = "download_email.html"
      template = templateEnv.get_template(TEMPLATE_FILE)
      outputText = template.render()
      print(outputText)

      content = Content("text/html", outputText)

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
      return jsonify(success=False)


