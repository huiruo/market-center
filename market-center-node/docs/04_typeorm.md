```
yarn add mysql reflect-metadata

mysql 是底层数据库驱动程序。如果你使用的是其他数据库系统，则必须安装相应的包。
reflect-metadata 需要使装饰器正常工作
```

#### old
```javaScript
createConnection(typeorm).then(async connection => {
  console.log('链接成功');
  console.log('connection',);
  /*
	 //使用manager插入数据
    let photo:Photo = new Photo();
    photo.name = 'Mary';
    photo.description = 'A beautiful long-hair girl!';
    photo.filename = 'Mary.gif';
    photo.isPublished = false;
    photo.views = 150;
    await connection.manager.save(photo).then(photo => {
        console.log("Photo has been saved,it's id is:"+photo.id)
    });
    //使用manager查数据
    let savedPhotos = await connection.manager.find(Photo);
    console.log("All photos from the db: ", savedPhotos);
    */
  // 使用manager查数据
  const user = await connection.manager.find(User);
  console.log('All photos from the db: ', user);
}).catch(error => console.log('sql:', error));
```