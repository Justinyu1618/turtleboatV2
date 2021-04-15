from flask import Blueprint, request, jsonify 
from server.app import db
from uuid import uuid4
from server.models import Projects
import sqlalchemy

projects_bp = Blueprint("project", __name__)

@projects_bp.route("/new_project", methods=['POST'])
def new_project():
    data = request.get_json()
    new_project = Projects()
    try:
	    new_project.populate(data)
	    db.session.add(new_project)
	    db.session.commit()
    except sqlalchemy.exc.IntegrityError as e:
	    db.session.rollback()
	    return jsonify(message="Email already exists", success=False), 200
    return jsonify(message="New User Created!", success=True), 200

@projects_bp.route("/update_project", methods=['POST'])
def update_project():
    return "hello"

@projects_bp.route("/get_projects", methods=['GET'])
def get_projects():
    return "hello"

@projects_bp.route("/update_members", methods=['POST'])
def update_members():
    return "hello"