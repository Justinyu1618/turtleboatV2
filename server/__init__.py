from server.app import app
from server.api.v1 import users_bp, projects_bp, module_templates_bp, courses_bp
# from server.controllers.cron import cron_job
from flask import Flask
from flask_restful import Api
from apscheduler.schedulers.background import BackgroundScheduler
import sys

app.register_blueprint(users_bp, url_prefix='/api/v1/users')
app.register_blueprint(projects_bp, url_prefix='/api/v1/projects')
app.register_blueprint(module_templates_bp, url_prefix='/api/v1/module_templates')
app.register_blueprint(courses_bp, url_prefix='/api/v1/courses')

# print("Initializing Background Scheduler")
# sched = BackgroundScheduler()
# sched.add_job(cron_job, trigger='interval', days=1)
# sched.start()
# cron_job()
