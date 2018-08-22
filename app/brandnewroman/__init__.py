import os
from .mailchimp import mc
from flask import Flask
from .routes import bp
from urllib.parse import unquote


# manually decode <enter> from '%9Z' to '%0A' 
# (since IIS servers will error out when it sees '%0A's)
def decode(text):
  if text:
    return unquote(text.replace('<enter>', '%0A'))
  else:
    return ''


def create_app(
    package_name=__name__, 
    static_folder='static',
    template_folder='templates',
    **config_overrides):

  # initialize app
  app = Flask(package_name,
              static_url_path='/assets',
              static_folder=static_folder,
              template_folder=template_folder)

  # set mailchimp settings 
  mc_user = os.getenv('MAILCHIMP_USERNAME')
  mc_key = os.getenv('MAILCHIMP_KEY')
  mc_list_id = os.getenv('MAILCHIMP_LIST_ID')

  # load mailchimp credentials
  mc.set_credentials(mc_user, mc_key)
  mc.set_list_id(mc_list_id)

  # custom decoder for '%0A' and '%0U' as these 
  # characters are not supported in iis servers
  app.jinja_env.globals.update(decode=decode)

  # Apply overrides
  app.config.update(config_overrides)

  # Register Routes in routes.py
  app.register_blueprint(bp)

  return app

