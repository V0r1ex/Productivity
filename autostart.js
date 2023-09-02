var Service = require('node-windows').Service

var svc = new Service({
  name:'Productivity',
  description: 'The nodejs.org Productivity serveer.',
  script: 'D:\\Programming\\Web\\Портфолио\\Node.js\\Productivity\\sources\\server\\server.js'
})

svc.on('install',function(){
  svc.start()
})

svc.install()

// npx kill-port 800