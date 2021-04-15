from flask import Blueprint, request, jsonify 
from server.app import db
from uuid import uuid4
from server.models import Module_Templates
import sqlalchemy

module_templates_bp = Blueprint("module_templates", __name__)

@module_templates_bp.route("/new_template", methods=['POST'])
def new_template():
    data = request.get_json()
    try:
        if(data["id"]):
            template = Module_Templates.query.filter_by(id=data["id"]).first()
            if (not template):
                return jsonify(message="Id not found!", success=False), 403
            template.populate(data["template"])
        else:
            new_template = Module_Templates()
            new_template.populate(data["template"])
            db.session.add(new_template)	    
        db.session.commit()
    except sqlalchemy.exc.IntegrityError as e:
        db.session.rollback()
        return jsonify(message="Module template already exists", success=False), 200
    return jsonify(message="New Module Template Created!", success=True), 200

@module_templates_bp.route("/get_templates", methods=['GET'])
def get_templates():
    return jsonify([mt.serialize() for mt in Module_Templates.query.all()]), 200

@module_templates_bp.route("/get_template", methods=['POST'])
def get_template():
    data = request.get_json()
    if(data["id"]):
        template = Module_Templates.query.filter_by(id=data["id"]).first()
        if (not template):
            return jsonify(message="Id not found!", success=False), 403
        return jsonify(template.serialize()), 200
    return jsonify(message=f"No id in request", success=False), 500

@module_templates_bp.route("/remove_template", methods=['POST'])
def remove_template():
    data = request.get_json()
    if(data["id"]):
        template = Module_Templates.query.filter_by(id=data["id"]).first()
        if (not template):
            return jsonify(message="Id not found!", success=False), 403
        db.session.delete(template)
        db.session.commit()
    
    return jsonify(message=f"Template {data['id']} deleted!", success=True), 200
