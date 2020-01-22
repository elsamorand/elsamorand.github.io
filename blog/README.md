# Blog

## Index

{% for file in site.static_files %}
  {% if file.path contains '/blog/' %}
[{{ file.basename | slice: 5, file.basename.size }}]({{ file.path | slice: 0, (file.path.size | minus: 3)}})
  {% endif %}
{% endfor %}
