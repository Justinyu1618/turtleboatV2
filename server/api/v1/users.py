from flask import Blueprint, request, jsonify 
from server.app import db
from uuid import uuid4
from server.models import Users
import sqlalchemy

users_bp = Blueprint("user", __name__)

@users_bp.route("/new_user", methods=['POST'])
def new_user():
    data = request.get_json()
    new_user = Users()
    try:
	    new_user.populate(data)
	    db.session.add(new_user)
	    db.session.commit()
    except sqlalchemy.exc.IntegrityError as e:
	    db.session.rollback()
	    return jsonify(message="Email already exists", success=False), 200
    return jsonify(message="New User Created!", success=True), 200

@users_bp.route("/update_info", methods=['POST'])
def update_info():
    
    return "hello"