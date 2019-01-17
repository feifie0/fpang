let json = [{
    "pageTitle": {
        "title": "", //页面 网页标题
        "level": "", //所在分类
        "name": '', //简写标题
        "text": [{ //简介 允许多条  
            "type": "text", //text类型放入P标签
            "con": "内容"
        }, {
            "type": "link", //link类型放入a标签 内容是数组 只能有两个元素 [0]文字描述  [1]连接
            "con": '',
            "link": ''
        }]
    },
    "block": [{ //模块
        "type": 'block',
        "title": "模块标题", //模块标题 页面的三级标题
        "con": [{
                "type": "text", //text类型放入P标签 内容无要求
                "con": "内容" //内容包换 strong标签 尖括号转义为 &lt; &gt;
            },
            {
                "type": "code", //code类型 放入 .code code 标签里面
                "con": "内容" //内容要求：1.字符串类型 2.@@代替换行符 3.&&代替空格
            },
            {
                "type": "img", //img类型 放入 div img 标签里面 
                "con": "连接地址" //图片存放地址
            },
            {
                "type": "list", //list类型 放入 ol li 标签里面 有序列表 序号为 1.  2. 3.
                "con": [] //内容为数组 
            },
            {
                "type": "title", //title类型 放入 h4 标签里面 页面的四级标题
                "con": "" //内容为字符串类型
            }
        ]
    }],
    nav: [{
            type: 'menu', //menu类型 => 菜单
            name: "javaScript",
            itme: [{
                type: 'menu',
                name: "插件",
                itme: [{
                    type: 'menuitem', //menuitem类型 => 菜单项
                    name: "菜单项",
                }]
            }]
        },
        {
            type: 'menu',
            name: "server",
            itme: [{
                type: 'menuitem',
                name: "菜单项",
            }]
        }
    ]
}]
let a = `

show dbs :		
显示已有数据库，如果你刚安装好，会默认有local、admin(config)，这是MongoDB的默认数据库，我们在新建库时是不允许起这些名称的。

use 库名： 		
进入数据，也可以理解成为使用数据库。成功会显示：switched to db admin。

show collections: 	
显示数据库中的集合（关系型中叫表，我们要逐渐熟悉）。

db:			
显示当前位置，也就是你当前使用的数据库名称，这个命令算是最常用的，因为你在作任何操作的时候都要先查看一下自己所在的库，以免造成操作错误。

use db（建立数据库）：	
use不仅可以进入一个数据库，如果你敲入的库不存在，它还可以帮你建立一个库。但是在没有集合前，它还是默认为空。

db.集合.insert( ):	
新建数据集合和插入文件（数据），当集合没有时，这时候就可以新建一个集合，并向里边插入数据。Demo：db.user.insert({"name":"jspang"})

db.集合.find( ):	
查询所有数据，这条命令会列出集合下的所有数据，可以看到MongoDB是自动给我们加入了索引值的。Demo：db.user.find()

db.集合.findOne( ):	
查询第一个文件数据，这里需要注意的，所有MongoDB的组合单词都使用首字母小写的驼峰式写法。

db.集合.update({查询},{修改}):
修改文件数据，第一个是查询条件，第二个是要修改成的值。这里注意的是可以多加文件数据项的，比如下面的例子。

db.集合.remove(条件)：
删除文件数据，注意的是要跟一个条件。Demo:db.user.remove({"name":"jspang"})

db.集合.drop( ):
删除整个集合，这个在实际工作中一定要谨慎使用，如果是程序，一定要二次确认。

db.dropDatabase( ):
删除整个数据库，在删除库时，一定要先进入数据库，然后再删除。实际工作中这个基本不用，实际工作可定需要保留数据和痕迹的。

$set修改器
用来修改一个指定的键值(key),这时候我们要修改上节课的sex和age就非常方便了，只要一句话就可以搞定。

$unset用于将key删除
它的作用其实就是删除一个key值和键。一般女孩子都是不希望看到自己的年龄的，所以要求我们把年龄删除。这时候我们就可以使用$unset的形式。

$inc对数字进行计算
它是对value值的修改，但是修改的必须是数字，字符串是不起效果的。我们现在要对MiJie的年龄减去2岁，就可以直接用$inc来操作。

multi选项
现在领导说了，你要把每个人的爱好也加入进来，但是如果你直接写会只加一个，比如下面这种形式。

upsert选项
upsert是在找不到值的情况下，直接插入这条数据。比如我们这时候又来了一个新同事xiaoWang，我们这时候修改他的信息，age设置成20岁，但集合中并没有这条数据。这时候可以使用upsert选项直接添加。

$push追加数组/内嵌文档值
$push的功能是追加数组中的值，但我们也经常用它操作内嵌稳文档，就是{}对象型的值。先看一个追加数组值的方式，比如我们要给小王加上一个爱好(interset)为画画（draw）：

$ne查找是否存在
它主要的作用是，检查一个值是否存在，如果不存在再执行操作，存在就不执行，这个很容易弄反，记得我刚学的时候就经常弄反这个修改器的作用，给自己增加了很多坑。

$addToSet 升级版的$ne
它是$ne的升级版本（查找是否存在，不存在就push上去），操作起来更直观和方便，所以再工作中这个要比$en用的多。

$each 批量追加
它可以传入一个数组，一次增加多个值进去，相当于批量操作，性能同样比循环操作要好很多，这个是需要我们注意的，工作中也要先组合成数组，然后用批量的形式进行操作。

$pop 删除数组值
$pop只删除一次，并不是删除所有数组中的值。而且它有两个选项，一个是1和-1。

interest.int 
有时候只知道修改数组的第几位，但并不知道是什么，这时候我们可以使用interest.int 的形式。

 I COMMAND  [LogicalSessionCacheRefresh] command config.system.sessions command: listIndexes { listIndexes: "system.sessions", cursor: {}, $db: "config" } numYields:0 ok:0 errMsg:"ns does not exist: config.system.sessions" errName:NamespaceNotFound errCode:26 reslen:134 locks:{ Global: { acquireCount: { r: 2 } }, Database: { acquireCount: { r: 2 } }, Collection: { acquireCount: { r: 1 } } } protocol:op_msg 213ms
 I STORAGE  [LogicalSessionCacheRefresh] createCollection: config.system.sessions with generated UUID: f5139e39-dd84-41bb-a031-202bdcdd5847
 I INDEX    [LogicalSessionCacheRefresh] build index on: config.system.sessions properties: { v: 2, key: { lastUse: 1 }, name: "lsidTTLIndex", ns: "config.system.sessions", expireAfterSeconds: 1800 }
 I INDEX    [LogicalSessionCacheRefresh]     building index using bulk method; build may temporarily use up to 500 megabytes of RAM
 I INDEX    [LogicalSessionCacheRefresh] build index done.  scanned 0 total records. 0 secs


 --dbpath /data/db

 db.auth("root","0.....")

 service mongod stop

 service mongod start

 db.shutdownServer()

 db.system.users.find()

 iptables -A INPUT -p tcp -m state --state NEW -m tcp --dport 27017 -j ACCEPT

`
// 创建 管理员
db.createUser({
    user: 'sunshine', //验证账号
    pwd: '000000', //验证密码
    customData: { //描述
        name: '阳光印象',
    },
    roles: [{
        role: "readWrite",
        db: "sun-imp"
    }, {
        role: "dbOwner",
        db: "sun-imp"
    }]
})
// 创建 管理员
db.createUser({
    user: 'root',
    pwd: '0.....',
    customData: {
        name: '阳光印象',
    },
    roles: [{
            "role": "userAdminAnyDatabase",
            "db": "admin"
        },
        {
            "role": "dbOwner",
            "db": "admin"
        },
        {
            "role": "clusterAdmin",
            "db": "admin"
        }
    ]
})
db.createUser({
    user: 'sunshine',
    pwd: '000000',
    customData: {
        name: '阳光印象',
    },
    roles: [{
        role: "readWrite",
        db: "sun-imp"
    }, {
        role: "dbOwner",
        db: "sun-imp"
    }]
})
db.createUser({
    user: "root",
    pwd: "0.....",
    roles: [{
        role: "userAdminAnyDatabase",
        db: "admin"
    }]
});
db.updateUser(
    "root", {
        roles: [{
                "role": "userAdminAnyDatabase",
                "db": "admin"
            },
            {
                "role": "dbOwner",
                "db": "admin"
            },
            {
                "role": "clusterAdmin",
                "db": "admin"
            }
        ]
    }
)
