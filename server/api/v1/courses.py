from flask import Blueprint, request, jsonify 
from server.app import db
from uuid import uuid4
from server.models import Courses
import sqlalchemy
from datetime import datetime

courses_bp = Blueprint("courses", __name__)

@courses_bp.route("/new_course", methods=['POST'])
def new_course():
    data = request.get_json()
    try:
        if("id" in data and data["id"]):
            course = Module_courses.query.filter_by(id=data["id"]).first()
            if (not course):
                return jsonify(message="Id not found!", success=False), 403
            course.populate(data["course"])
        else:
            new_course = Courses()
            new_course.populate({"name": "March To May Bootcamp", "meta": {"date_created": str(datetime.now())}})
            db.session.add(new_course)	    
            db.session.commit()
    except sqlalchemy.exc.IntegrityError as e:
        db.session.rollback()
        return jsonify(message="Module course already exists", success=False), 200
    return jsonify(message="New Module course Created!", success=True), 200

@courses_bp.route("/get_courses", methods=['GET'])
def get_courses():
    return jsonify([mt.serialize() for mt in Courses.query.all()]), 200

@courses_bp.route("/update_template_map", methods=['POST'])
def update_template_map():
    data = request.get_json()
    print(data)
    if("id" in data and "map" in data):
        course = Courses.query.filter_by(id=data["id"]).first()
        if (not course):
            return jsonify(message="Id not found!", success=False), 403
        course.template_map = data["map"]
        db.session.commit()
        return jsonify(message=f"course {data['id']} updated", success=True), 200
    return jsonify(message=f"bad data! ${data}", success=False), 400
