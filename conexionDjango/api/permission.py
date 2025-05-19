
from rest_framework.permissions import BasePermission

#Esta clase es para verificar el permiso de admin


class IsAdminUserGroup(BasePermission):
     def has_permission(self, request, view):
          return request.user and request.user.group.filter(name="admin").exists()
