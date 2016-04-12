from django.db import models

# Create your models here.

class Tool(models.Model):
    name = models.TextField(null=False)
    description = models.TextField(blank=True)
    version = models.TextField(null=False)
    type = models.TextField(null=False)
    

class Image(models.Model):
   family = models.TextField()
   edition = models.TextField()
   name = models.TextField()
   display = models.TextField()
   description = models.TextField()
   language = models.TextField()
   architecture = models.TextField()
   

class IaaS(models.Model):
    name = models.TextField(null=False)
    description = models.TextField(blank=True)
    type = models.TextField(null=False)
    ip=models.TextField(null=False)
    user = models.TextField(null=False)
    password = models.TextField(null=False)
    
class DeployImage(models.Model):
    idImage = models.IntegerField(null=False)
    name = models.TextField(null=False)

class DeployTool(models.Model):
    idTool = models.IntegerField(null=False)
    name = models.TextField(null=False)


class Deploy(models.Model):
    description = models.TextField()
    priority = models.IntegerField()
    tools = models.ManyToManyField(DeployTool)
    images = models.ManyToManyField(DeployImage)
    idIaaS = models.IntegerField()
   

