# This pseudo-script is designed to work on Evan's machine and may not work for
# anyone else

# It assumes a running dev site with ARCHIVE_MODE=1

rm -rf ./127.0.0.1:3000 
wget -r --adjust-extension -l 0 -p http://127.0.0.1:3000/2025/
cp -a ~/src/hunt2025/site/dist/static/* 127.0.0.1:3000/2025/static
rsync -aP broder@athena.dialup.mit.edu:/mit/puzzle/www/2025/heist/ ./127.0.0.1:3000/2025/heist/
 
echo 'google-site-verification: google27ce0404766cbc72.html' > 127.0.0.1:3000/2025/google27ce0404766cbc72.html 
echo 'Header set Cache-Control "public, max-age=31536000, immutable"' > 127.0.0.1:3000/2025/static/.htaccess
cat > 127.0.0.1:3000/2025/.htaccess <<'EOF'
Options -Indexes
AddDefaultCharset utf-8
SetOutputFilter DEFLATE

DirectorySlash Off

RewriteEngine On
RewriteOptions AllowNoSlash
RewriteCond %{HTTPS} off
RewriteRule (.*) https://%{HTTP_HOST}%{REQUEST_URI} [R=301,L]
RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI}.html -f
RewriteRule ^(.+)$ $1.html [L]
EOF

echo 'DirectorySlash On' > ./127.0.0.1:3000/2025/heist/.htaccess 
rsync -aP --delete-after ./127.0.0.1:3000/2025/ broder@athena.dialup.mit.edu:/mit/puzzle/www/2025/
