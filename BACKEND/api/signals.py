# from django.db.models.signals import post_save
# from django.dispatch import receiver
# from .models import Usuarios, InteresesUsuarios, Intereses

# @receiver(post_save, sender=Usuarios)
# def agregar_interes (sender, instance, created, **kwargs):
#     if created:
#         interes_predeterminado = Intereses.objects.first()
#         if interes_predeterminado:
#             InteresesUsuarios.objects.create(usuario=instance, intereses=interes_predeterminado)
