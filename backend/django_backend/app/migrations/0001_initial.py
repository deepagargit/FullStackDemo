# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2016-04-12 09:03
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Deploy',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.TextField()),
                ('priority', models.IntegerField()),
                ('idIaaS', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='DeployImage',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('idImage', models.IntegerField()),
                ('name', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='DeployTool',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('idTool', models.IntegerField()),
                ('name', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='IaaS',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.TextField()),
                ('description', models.TextField(blank=True)),
                ('type', models.TextField()),
                ('ip', models.TextField()),
                ('user', models.TextField()),
                ('password', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Image',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('family', models.TextField()),
                ('edition', models.TextField()),
                ('name', models.TextField()),
                ('display', models.TextField()),
                ('description', models.TextField()),
                ('language', models.TextField()),
                ('architecture', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Tool',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.TextField()),
                ('description', models.TextField(blank=True)),
                ('version', models.TextField()),
                ('type', models.TextField()),
            ],
        ),
        migrations.AddField(
            model_name='deploy',
            name='images',
            field=models.ManyToManyField(to='app.DeployImage'),
        ),
        migrations.AddField(
            model_name='deploy',
            name='tools',
            field=models.ManyToManyField(to='app.DeployTool'),
        ),
    ]
