from sqlalchemy import Column, Integer, String, ForeignKey, Boolean, DateTime
from sqlalchemy.orm import relationship
from server.models import Base, DBTable, update_db
import datetime
import secrets
from sqlalchemy.dialects.postgresql import JSONB
from server.models.users import association_table

class Projects(Base, DBTable):
  __tablename__ = "projects"
  id = Column(Integer, primary_key=True,
              unique=True, autoincrement=True)
  project_id = Column(String, unique=True)
  name = Column(String, nullable=False)
  courseId = Column(String, nullable=False)
  members = relationship("Users", secondary=association_table, back_populates="projects")
  # modules = relationship("Modules", backref="projects")