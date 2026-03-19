# Manga Portfolio — Django Integration Guide

This Manga-style portfolio is a responsive, animation-heavy frontend built with pure HTML, CSS, and JS (GSAP). It is structured modularly so it can be directly integrated into your Python Django backend.

## 1. Move Static Assets

Copy the contents of the `static` folder directly into your Django project's static directory. 

If you have an app named `portfolio`:
```bash
cp -r static/css your_django_project/portfolio/static/portfolio/css
cp -r static/js your_django_project/portfolio/static/portfolio/js
```

## 2. Implement the Template

Place the `index.html` into your Django `templates` directory (`your_django_project/portfolio/templates/portfolio/index.html`). 

### Update the Template to use Django Tags

Add the `{% load static %}` tag at the very top of your HTML file, and wrap your CSS/JS paths:

```html
{% load static %}
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- ... -->
    <link rel="stylesheet" href="{% static 'portfolio/css/style.css' %}">
</head>
<body>
    <!-- ... content ... -->
    <script src="{% static 'portfolio/js/app.js' %}"></script>
</body>
</html>
```

## 3. Dynamic Data Models

You can convert the static sections into dynamic ones by passing Context data from your `views.py`.

### Example `models.py`
```python
from django.db import models

class Project(models.Model):
    title = models.CharField(max_length=150)
    tech_stack = models.CharField(max_length=200, help_text="Comma separated e.g. Django, React, Redis")
    description = models.TextField()
    sfx = models.CharField(max_length=20, default="BAM!")

class Experience(models.Model):
    years = models.CharField(max_length=50) # '2020 - 2023'
    title = models.CharField(max_length=150)
    description = models.TextField()
```

### Example `views.py`
```python
from django.shortcuts import render
from .models import Project, Experience

def index(request):
    return render(request, 'portfolio/index.html', {
        'projects': Project.objects.all(),
        'experiences': Experience.objects.order_by('-id')
    })
```

### Example Template Loop (Projects)
In `index.html`, replace the hardcoded "Mission Episodes" with a loop:

```html
{% for project in projects %}
<section class="panel project-panel">
    <div class="sfx" style="top: 10px; right: 10px;">{{ project.sfx }}</div>
    
    <h2 class="title" style="font-size: 2rem;">Episode {{ forloop.counter }}: {{ project.title }}</h2>
    
    <div style="margin-bottom: 1rem;">
        <span class="tech-badge">{{ project.tech_stack }}</span>
    </div>
    
    <p>{{ project.description }}</p>
    <a href="#" class="manga-btn" style="font-size: 1rem; margin-top: 1rem;">Read Chapter</a>
</section>
{% endfor %}
```

Enjoy your performant, deeply aesthetic Manga portfolio app powered by Django!
