# webgl study

## create new project
```
mkdir my_project
cd my_project
npm init -y

npm install -D browserify es2040 budo indexhtmlify uglify-js

mkdir build
touch index.js
```

## modify package.json
```
"scripts": {
  "start": "budo index.js --open --live --host localhost -- -t es2040",
  "build": "browserify index.js -t es2040 | uglifyjs -cm | indexhtmlify > build/index.html"
```

## run
```
npm run start
```

## build
```
npm run build
```

## simple way
```
mkdir my_project
cd my_project
mkdir build
touch index.js

budo index.js --open --live --host localhost
browserify index.js | uglifyjs -cm | indexhtmlify > build/index.html
```

## git push
```
git add .
git commit -m "COMMIT NOTE"
git push -u origin master

// remove
git rm --cached -r my_project/build/index.html

```
