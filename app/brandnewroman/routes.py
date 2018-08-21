from flask import Blueprint, render_template, redirect, url_for
bp = Blueprint('main', __name__)


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

