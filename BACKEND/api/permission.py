from rest_framework.permissions import BasePermission

class IsAdminUserGroup(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.groups.filter(name="admin").exists()

class IsEmpresaUser(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.groups.filter(name="empresa").exists()

class IsUsuarioUser(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.groups.filter(name="oferente").exists()
