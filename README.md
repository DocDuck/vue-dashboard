# vue-dashboard

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build

```
### Setup base Url for preview build app
## !! Не забыть выпилить эту конфигу перед продакшоном !!
```
vue.config.js -> baseUrl: process.env.NODE_ENV === 'production'
      ? 'C:/SRC/vue-dashboard/dist/' // абсолютный путь до индекс штмльки
      : '/'
  ,  
  
```
### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
