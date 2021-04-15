# from server.controllers.dopeauth import authenticate_with_dopeauth
# from server.app import db
# from server.models.user import User
# from server.models.client import Client
# from server.models import add_to_db


# def authenticate_firsttime(email, uid, token):
#     """
#     Authenticates the code first time!

#     returns client or None
#     """
#     # TODO(kevinfang): FALSE authentication should be TRUE unless in debug
#     if(authenticate_with_dopeauth(email, uid, token, True)):
#         user = User.query.filter_by(email=email).first()
#         if user is None:
#             user = User(email)
#         else:
#             user.sign_in()

#         client = Client(user)
#         if (add_to_db(client, others=[user], rollbackfunc=lambda:client.generate_uniques())):
#             return client
#     return None


# def authenticate(uid, token):
#     """
#     Authenticates with email and reddlinks token
#     returns (True or False, user)
#     """
#     # TODO(kevinfang): make client uid unique
#     client = Client.query.filter_by(uid=uid, token=token).first()
#     if (client is not None):
#         # Yay client confirmed!
#         return True, client.user
#     return False, None
