COCO FIZZ MULTI-PAGE WEBSITE
============================

FILES
- index.html          Home page
- products.html       Product catalogue (loads active products from Supabase)
- our-story.html      Accurate coconut oil mill origin story
- manufacturing.html  Manufacturing journey page; awaits genuine factory photos/details
- contact.html        Contact details loaded from Supabase business_settings
- admin.html          Existing admin console (access via admin.html#admin)
- styles.css          Shared design system and responsive layout
- app.js              Shared public-page Supabase integration

UPLOAD TO GITHUB (Android)
1. Download and extract this ZIP using your phone's Files app.
2. Open the GitHub repository in your browser and select the main branch.
3. Upload all extracted files to the repository root (not the ZIP itself).
4. Commit the upload to main. Netlify should deploy automatically.
5. Open https://coco-fizz.netlify.app and test each navigation link.

IMPORTANT
- Do not delete your existing Index.html until the new index.html has been uploaded and checked.
- GitHub Pages/Netlify treat index.html (lowercase) as the default homepage.
- Product bottle placeholders are intentional. Upload genuine product-pack photographs through the admin console; no packaging has been fabricated.
- Manufacturing page intentionally avoids unverified certification or factory claims. Add genuine photographs and confirmed details later.
- Admin console still requires Supabase/RLS verification. Do not assume admin login is working until tested.
- Supabase publishable key is intended for browser use; never add a service-role key to website files.
- Netlify deployment is not performed by this ZIP. It happens after files are committed to the connected GitHub main branch and the deploy succeeds.
