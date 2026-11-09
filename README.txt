COCO FIZZ WEBSITE
=================
Pages: index, products, our-story, manufacturing, contact (+ 404). Shared: styles.css, app.js.
admin.html is the admin console only (open it directly; not indexed by search engines).
robots.txt and sitemap.xml assume https://coco-fizz.netlify.app. Change the domain if you use another one.

UPLOAD: extract the ZIP, upload all files to the repository root (not the ZIP), commit to main. Netlify deploys automatically.
Delete any old Index.html (capital I) in the repo so it does not clash with index.html.

NOTES
- Product images: upload real pack photos in the admin console. Until then, flavour illustrations are shown.
- No factory or certification claims are made. Add them only when verified.
- The Supabase publishable key is meant for browsers. Never add a service-role key.
- Admin login still needs testing against your Supabase admin_users table and RLS policies.
