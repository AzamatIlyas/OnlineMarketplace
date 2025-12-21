
from sqladmin import ModelView

from app.db.models.ad import Ad
from app.db.models.report import Report
from app.db.models.user import User


class UserAdmin(ModelView, model=User):
    column_list = [
        User.id,
        User.email,
        User.first_name,
        User.last_name,
        User.is_banned,
        User.is_verified
    ]
    column_details_exclude_list = [User.password_hash]
    can_delete = False


class AdAdmin(ModelView, model = Ad):
    column_list = [c.name for c in Ad.__table__.columns] + [Ad.user]


class ReportAdmin(ModelView, model=Report):
    column_list = [c.name for c in Report.__table__.columns] + [Report.user]