# Index

## Blog
[/blog](/blog)
{% for file in site.static_files %}
  {% if file.path contains '/blog/' %}
    {% assign s = file.path.size | minus: 3 %}
[/blog/{{ file.basename }}]({{ file.path | slice: 0, s}})
  {% endif %}
{% endfor %}
