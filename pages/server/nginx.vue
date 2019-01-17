<template>
  <section id="page-nginx">
    <!-- 标题 -->
    <h1>Nginx的基础使用和配置</h1>
    <!-- 简介 -->
    <div class="title">
      <p>Nginx是一款轻量级的HTTP服务器，采用事件驱动的异步非阻塞处理方式框架，这让其具有极好的IO性能，时常用于服务端的反向代理和负载均衡。</p>
      <p>
        官网地址：
        <a target="_blank" href="http://nginx.org/">http://nginx.org/</a>
      </p>
      <!-- <p>参考教程：</p> -->
    </div>
    <!-- 第一、服务器简单配置 -->
    <div class="block">
      <h3>第一、服务器简单配置</h3>
      <p>我用的操作系统是CentOS 7.4 64位版本,阿里云购买的9.9活动机。</p>
      <p>连接上之后运行下面的代码,这段代码能让操作系统跟好用电。（阿里的主机默认已经安装过yum）</p>
      <div class="code">
        <code>yum -y install gcc gcc-c++ autoconf pcre-devel make automake
          <br>yum -y install wget httpd-tools vim
        </code>
      </div>
    </div>
    <!-- 第二、安装nginx -->
    <div class="block">
      <h3>第二、安装nginx</h3>
      <p>先查看下yum是否已经存在，命令如下</p>
      <div class="code">
        <code>yum list | grep nginx</code>
      </div>
      <p>不存在，或者不是想要的版本，就执行下面这行代码，使用vim编辑配置文件</p>
      <div class="code">
        <code>vim /etc/yum.repos.d/nginx.repo</code>
      </div>
      <p>
        打开之后修改内容：
        <strong>注意：版本号 和系统名要修改成自己的系统版本</strong>
      </p>
      <div class="code">
        <code>[nginx]
          <br>name=nginx repo
          <br>baseurl=http://nginx.org/packages/centeos/7/$basearch/ #centeos shi 系统名 7 是版本号
          <br>gpgcheck=0
          <br>enabled=1
        </code>
      </div>
      <p>修改完配置文件就可以安装了，执行下面命令就可以了</p>
      <div class="code">
        <code>yum install nginx</code>
      </div>
      <p>安装完成后可以使用nginx命令了，下面命令检测版本</p>
      <div class="code">
        <code>nginx -v</code>
      </div>
      <p>出版本号就说明安装好了</p>
    </div>
    <!-- 第三、nginx.conf主配置文件 -->
    <div class="block">
      <h3>第三、配置文件</h3>
      <p>使用以下命令查看nginx安装了什么文件，和路径。（rpm是linux的rpm包管理工具，-q代表询问模式，-l 代表返回列表）</p>
      <div class="code">
        <code>rpm -ql nginx</code>
      </div>
      <p>找到nginx.conf主配置文件</p>
      <div class="code">
        <code>cd /etc/nginx
          <br>vim nginx.conf
        </code>
      </div>
      <p>下面是文件的详细注释，几乎每一句都进行了注释，可以根据需要来进行配置。</p>
      <div class="code">
        <code>#运行用户，默认即是nginx，可以不进行设置
          <br>user&nbsp;&nbsp;nginx;
          <br>
          <br>#Nginx进程，一般设置为和CPU核数一样
          <br>worker_processes 1;
          <br>
          <br>#错误日志存放目录
          <br>error_log&nbsp;&nbsp;/var/log/nginx/error.log warn;
          <br>
          <br>#进程pid存放位置
          <br>pid&nbsp;&nbsp;/var/run/nginx.pid;
          <br>events {
          <br>&nbsp;&nbsp;worker_connections 1024; # 单个后台进程的最大并发数
          <br>}
          <br>
          <br>http {
          <br>&nbsp;&nbsp;include /etc/nginx/mime.types; #文件扩展名与类型映射表
          <br>&nbsp;&nbsp;default_type application/octet-stream; #默认文件类型
          <br>
          <br>&nbsp;&nbsp;#设置日志模式
          <br>&nbsp;&nbsp;log_format main '$remote_addr - $remote_user [$time_local] "$request" '
          <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'$status $body_bytes_sent "$http_referer" '
          <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'"$http_user_agent" "$http_x_forwarded_for"';
          <br>
          <br>&nbsp;&nbsp;access_log /var/log/nginx/access.log main; #nginx访问日志存放位置
          <br>
          <br>&nbsp;&nbsp;sendfile on; #开启高效传输模式
          <br>
          <br>&nbsp;&nbsp;#tcp_nopush on; #减少网络报文段的数量
          <br>
          <br>&nbsp;&nbsp;keepalive_timeout 65; #保持连接的时间，也叫超时时间
          <br>
          <br>&nbsp;&nbsp;#gzip on; #开启gzip压缩
          <br>
          <br>&nbsp;&nbsp;include /etc/nginx/conf.d/*.conf; #包含的子配置项位置和文件
          <br>}
        </code>
      </div>
      <p>下面子配置项nginx.conf文件的最后一行配置的那个路径</p>
      <div class="code">
        <code>server {
          <br>&nbsp;&nbsp;listen 80; #配置监听端口
          <br>&nbsp;&nbsp;server_name localhost; //配置域名
          <br>&nbsp;&nbsp;#charset koi8-r;
          <br>&nbsp;&nbsp;#access_log /var/log/nginx/host.access.log main;
          <br>&nbsp;&nbsp;location / {
          <br>&nbsp;&nbsp;&nbsp;&nbsp;root /usr/share/nginx/html; #服务默认启动目录
          <br>&nbsp;&nbsp;&nbsp;&nbsp;index index.html index.htm; #默认访问文件
          <br>&nbsp;&nbsp;}
          <br>&nbsp;&nbsp;#error_page 404 /404.html; # 配置404页面
          <br>&nbsp;&nbsp;# redirect server error pages to the static page /50x.html
          <br>&nbsp;&nbsp;#
          <br>&nbsp;&nbsp;error_page 500 502 503 504 /50x.html; #错误状态码的显示页面，配置后需要重启
          <br>&nbsp;&nbsp;location = /50x.html {
          <br>&nbsp;&nbsp;&nbsp;&nbsp;root /usr/share/nginx/html;
          <br>&nbsp;&nbsp;}
          <br>&nbsp;&nbsp;# proxy the PHP scripts to Apache listening on 127.0.0.1:80
          <br>&nbsp;&nbsp;#
          <br>&nbsp;&nbsp;#location ~ \.php$ {
          <br>&nbsp;&nbsp;&nbsp;&nbsp;# proxy_pass http://127.0.0.1;
          <br>&nbsp;&nbsp;#}
          <br>&nbsp;&nbsp;# pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
          <br>&nbsp;&nbsp;#
          <br>&nbsp;&nbsp;#location ~ \.php$ {
          <br>&nbsp;&nbsp;#&nbsp;&nbsp; root html;
          <br>&nbsp;&nbsp;#&nbsp;&nbsp; fastcgi_pass 127.0.0.1:9000;
          <br>&nbsp;&nbsp;#&nbsp;&nbsp; fastcgi_index index.php;
          <br>&nbsp;&nbsp;#&nbsp;&nbsp; fastcgi_param SCRIPT_FILENAME /scripts$fastcgi_script_name;
          <br>&nbsp;&nbsp;#&nbsp;&nbsp; include fastcgi_params;
          <br>&nbsp;&nbsp;#}
          <br>&nbsp;&nbsp;# deny access to .htaccess files, if Apache's document root
          <br>&nbsp;&nbsp;# concurs with nginx's one
          <br>&nbsp;&nbsp;#
          <br>&nbsp;&nbsp;#location ~ /\.ht {
          <br>&nbsp;&nbsp;#&nbsp;&nbsp;deny all;
          <br>&nbsp;&nbsp;#}
          <br>}
        </code>
      </div>
      <p>阿里云的新机默认没有打开80端口，需要手动打开，步骤如下：</p>
      <ol>
        <li>进入阿里云控制台，并找到ECS实例。</li>
        <li>点击实例后边的“更多”</li>
        <li>点击“网络和安全组” ，再点击“安全组配置”</li>
        <li>右上角添加“安全组配置”</li>
        <li>进行80端口的设置，具体设置如图就好。</li>
      </ol>
      <div class="img">
        <img src="~static/server/nginx/img1.png" alt>
      </div>
      <p>下面的操作基本上都是基于这两个文档修改配置</p>
      <!-- <p>接下来就可以通过ip访问网站了，default.conf子配置项可以修改默认启动文件，项目路径。</p>
      <div class="code">
        <code>location / {
          <br>root /usr/share/nginx/html; #服务默认启动目录
          <br>index index.html index.htm; #默认访问文件
          <br>}
        </code>
      </div>-->
    </div>
    <!-- 第四、启动/查询 -->
    <div class="block">
      <h3>第四、启动/查询</h3>
      <p>nginx命令可以直接启动（低版本是不行的）</p>
      <div class="code">
        <code>nginx</code>
      </div>
      <p>systemctl是linux的命令，什么服务都可以通过这个命令启动，区别只是换个名字</p>
      <div class="code">
        <code>systemctl start nginx.service</code>
      </div>
      <p>下面命令可以查看当前已启动的nginx进程</p>
      <div class="code">
        <code>ps aux | grep nginx</code>
      </div>
    </div>
    <!-- 第五、停止的四种方法 -->
    <div class="block">
      <h3>第五、停止的四种方法</h3>
      <p>立即停止服务（这种方法比较强硬，无论进程是否在工作，都直接停止进程）</p>
      <div class="code">
        <code>nginx -s stop</code>
      </div>
      <p>正常停止</p>
      <div class="code">
        <code>nginx -s quit</code>
      </div>
      <p>杀死进程(上面方法无效的时候使用这个)</p>
      <div class="code">
        <code>killall nginx</code>
      </div>
      <p>systemctl 停止</p>
      <div class="code">
        <code>systemctl stop nginx.service</code>
      </div>
      <p>重启Nginx服务</p>
      <div class="code">
        <code>systemctl restart nginx.service</code>
      </div>
      <p>重新载入配置文件</p>
      <div class="code">
        <code>nginx -s reload</code>
      </div>
      <p>查看端口号是否被占用</p>
      <div class="code">
        <code>netstat -tlnp</code>
      </div>
    </div>
    <div class="block">
      <h3>第六、错误/权限</h3>
      <p>子配置文件error_page指令用于自定义错误页面500，502，503，504 这些就是HTTP中最常见的错误代码，/50.html 用于表示当发生上述指定的任意一个错误的时候，都是用网站根目录下的/50.html文件进行处理。</p>
      <div class="code">
        <code>error_page 500 502 503 504 /50x.html;</code>
      </div>
      <p>单独为错误404配置处理方式</p>
      <div class="code">
        <code>error_page 404 /404.html;</code>
      </div>
      <p>也可以把错误跳转到另一个网站上</p>
      <div class="code">
        <code>error_page 404 /www.sun-imp.top;</code>
      </div>
      <p>简单的访问权限配置</p>
      <div class="code">
        <code>location&nbsp;/&nbsp;{
          <br>&nbsp;&nbsp;deny&nbsp;123.9.51.42; #拒绝访问 all
          <br>&nbsp;&nbsp;allow&nbsp;45.76.202.231; #允许访问
          <br>}
        </code>
      </div>
      <p>deny all代表所有ip都不可以访问，后面配置的allow 45.76.202.231; 也是不可以的，因为他在后面，优先级低，前面已经拒绝访问了后面不会执行（先执行的优先级高）</p>
      <div class="code">
        <code>location&nbsp;/&nbsp;{
          <br>&nbsp;&nbsp;deny&nbsp;all
          <br>&nbsp;&nbsp;allow&nbsp;45.76.202.231;
          <br>}
        </code>
      </div>
      <p>略微复杂的权限控制可以使用多个location模块，=代表精确匹配，也可以使用正则匹配</p>
      <div class="code">
        <code>location&nbsp;=/img{
          <br>&nbsp;&nbsp;allow&nbsp;all;
          <br>}
          <br>location&nbsp;=/admin{ #禁止访问admin下的所有文件
          <br>&nbsp;&nbsp;deny&nbsp;all;
          <br>}
          <br>location&nbsp;~\.php$ { #禁止访问所有的php页面
          <br>&nbsp;&nbsp;deny all;
          <br>}
        </code>
      </div>
    </div>
    <div class="block">
      <h3>第七、虚拟主机</h3>
      <p>虚拟主机是指在一台物理主机服务器上划分出多个磁盘空间，每个磁盘空间都是一个虚拟主机，每台虚拟主机都可以对外提供Web服务，并且互不干扰。在外界看来，虚拟主机就是一台独立的服务器主机，这意味着用户能够利用虚拟主机把多个不同域名的网站部署在同一台服务器上，而不必再为简历一个网站单独购买一台服务器</p>
      <h4>基于端口号配置虚拟主机</h4>
      <p>基于端口号来配置虚拟主机，算是Nginx中最简单的一种方式了。原理就是Nginx监听多个端口，根据不同的端口号，来区分不同的网站。</p>
      <p>我们可以直接配置在主文件里etc/nginx/nginx.conf文件里， 也可以配置在子配置文件里etc/nginx/conf.d/default.conf,也可以再conf.d文件夹下新建一个文件。</p>
      <p>修改配置文件中的server选项，这时候就会有两个server。</p>
      <div class="code">
        <code>server{
          <br>&nbsp;&nbsp;listen&nbsp;8001;
          <br>&nbsp;&nbsp;server_name&nbsp;localhost;
          <br>&nbsp;&nbsp;root&nbsp;/usr/share/nginx/html/html8001;
          <br>&nbsp;&nbsp;index&nbsp;index.html;
          <br>}
        </code>
      </div>
      <h4>基于IP的虚拟主机</h4>
      <p>基于IP和基于端口的配置几乎一样，只是把server_name选项，配置成IP就可以了。（因为只有一个ip没法测试随便写了一个）</p>
      <div class="code">
        <code>server{
          <br>&nbsp;&nbsp;listen&nbsp;8001;
          <br>&nbsp;&nbsp;server_name&nbsp;00.00.00.00;&nbsp;#修改为ip地址
          <br>&nbsp;&nbsp;root&nbsp;/usr/share/nginx/html/html8001;
          <br>&nbsp;&nbsp;index&nbsp;index.html;
          <br>}
        </code>
      </div>
      <h4>基于域名的虚拟主机</h4>
      <p>基于域名也是修改server_name，如果是子域名的话需要去解析后才能用</p>
      <div class="code">
        <code>server{
          <br>&nbsp;&nbsp;listen&nbsp;8001;
          <br>&nbsp;&nbsp;server_name&nbsp;00.00.00.00;&nbsp;#修改为ip地址
          <br>&nbsp;&nbsp;root&nbsp;/usr/share/nginx/html/html8001;
          <br>&nbsp;&nbsp;index&nbsp;index.html;
          <br>}
        </code>
      </div>
    </div>
    <div class="block">
      <h3>八、反向代理</h3>
      <p>反向代理还有些常用的指令：</p>
      <ol>
        <li>proxy_set_header :在将客户端请求发送给后端服务器之前，更改来自客户端的请求头信息。</li>
        <li>proxy_connect_timeout:配置Nginx与后端代理服务器尝试建立连接的超时时间。</li>
        <li>proxy_read_timeout : 配置Nginx向后端服务器组发出read请求后，等待相应的超时时间。</li>
        <li>proxy_send_timeout：配置Nginx向后端服务器组发出write请求后，等待相应的超时时间。</li>
        <li>proxy_redirect :用于修改后端服务器返回的响应头中的Location和Refresh。</li>
      </ol>
      <div class="code">
        <code>server{
          <br>&nbsp;&nbsp;listen&nbsp;80;
          <br>&nbsp;&nbsp;server_name&nbsp;www.sun-imp.top;
          <br>&nbsp;&nbsp;location&nbsp;/&nbsp;{
          <br>&nbsp;&nbsp;&nbsp;&nbsp;proxy_pass&nbsp;www.sun-imp.top;&nbsp;#域名或者ip都是可以的
          <br>&nbsp;&nbsp;}
          <br>}
        </code>
      </div>
    </div>
    <div class="block">
      <h3>九、适配PC或移动设备</h3>
      <p>反向代理还有些常用的指令：</p>
      <h4>$http_user_agent变量：</h4>
      <p>内置变量$http_user_agent，可以获取到请求客户端的userAgent，可以判断用户目前处于移动端还是PC端，进而展示不同的页面给用户。</p>
      <p>1.在/usr/share/nginx/目录下新建两个文件夹，分别为：pc和mobile目录（项目目录可以自定义在子配置文件里面配置）</p>
      <p>2.在pc和miblic目录下，新建两个index.html文件，文件里下面内容根据自己情况写</p>
      <p>3.修改配置文件</p>
      <div class="code">
        <code>server{
          <br>&nbsp;&nbsp;listen&nbsp;80;
          <br>&nbsp;&nbsp;server_name&nbsp;nginx2.jspang.com;
          <br>&nbsp;&nbsp;location&nbsp;/&nbsp;{
          <br>&nbsp;&nbsp;&nbsp;&nbsp;root&nbsp;/usr/share/nginx/pc;
          <br>&nbsp;&nbsp;&nbsp;&nbsp;if&nbsp;($http_user_agent&nbsp;~*&nbsp;'(Android|webOS|iPhone|iPod|BlackBerry)')&nbsp;{ #关键字有很多用到的时候自己百度下
          <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;root&nbsp;/usr/share/nginx/mobile;
          <br>&nbsp;&nbsp;&nbsp;&nbsp;}
          <br>&nbsp;&nbsp;&nbsp;&nbsp;index&nbsp;index.html;
          <br>&nbsp;&nbsp;}
          <br>}
        </code>
      </div>
    </div>
    <div class="block">
      <h3>十、Gzip压缩配置</h3>
      <p>gzip是需要服务器和浏览器同事支持的。当浏览器支持gzip压缩时，会在请求消息中包含Accept-Encoding:gzip,这样Nginx就会向浏览器发送听过gzip后的内容，同时在相应信息头中加入Content-Encoding:gzip，声明这是gzip后的内容，告知浏览器要先解压后才能解析输出。</p>
      <h4>gzip的配置项：</h4>
      <ol>
        <li>gzip : 该指令用于开启或 关闭gzip模块。</li>
        <li>gzip_buffers : 设置系统获取几个单位的缓存用于存储gzip的压缩结果数据流。</li>
        <li>gzip_comp_level : gzip压缩比，压缩级别是1-9，1的压缩级别最低，9的压缩级别最高。压缩级别越高压缩率越大，压缩时间越长。</li>
        <li>gzip_disable : 可以通过该指令对一些特定的User-Agent不使用压缩功能。</li>
        <li>gzip_min_length:设置允许压缩的页面最小字节数，页面字节数从相应消息头的Content-length中进行获取。</li>
        <li>gzip_http_version：识别HTTP协议版本，其值可以是1.1.或1.0.</li>
        <li>gzip_proxied : 用于设置启用或禁用从代理服务器上收到相应内容gzip压缩。</li>
        <li>gzip_vary : 用于在响应消息头中添加Vary：Accept-Encoding,使代理服务器根据请求头中的Accept-Encoding识别是否启用gzip压缩。</li>
      </ol>
      <p>gzip on是启用gizp模块，下面的一行是用于在客户端访问网页时，对文本、JavaScript 和CSS文件进行压缩输出。</p>
      <div class="code">
        <p>最简单的gzip配置</p>
        <code>http {
          <br>&nbsp;&nbsp;.....
          <br>&nbsp;&nbsp;gzip&nbsp;on;
          <br>&nbsp;&nbsp;gzip_types&nbsp;text/plain&nbsp;application/javascript&nbsp;text/css;
          <br>&nbsp;&nbsp;.....
          <br>}
        </code>
      </div>
    </div>
    <div class="block">
      <h3>最后推荐一款SST工具</h3>
      <p>可以不使用vim、不会linux指令做各种操作</p>
      <p>Windows版下载地址:<a target="_blank" href="http://www.hostbuf.com/downloads/finalshell_install.exe">http://www.hostbuf.com/downloads/finalshell_install.exe</a></p>

    </div>
  </section>
</template>

<script>
import rightList from "~/components/nav/rightlist.vue";
export default {
  data() {
    return {};
  },
  components: {
    rightList
  },
  mounted() {
    // console.log(Highlight)
    // Highlight()
    function init() {
      // console.log("a");
    }
  },

  updated() {
    // Highlight()
  }
};
</script>

<style lang='stylus' scoped>
#page-nginx {
  h1 {
    padding: 20px 0;
    border-bottom: 1px solid #ccc;
  }

  .title {
    padding: 10px 0;
  }

  .block {
    padding: 20px;
    border-bottom: 1px solid #888;

    h3 {
      line-height: 180%;
    }

    p {
      line-height: 180%;

      strong {
        color: red;
      }
    }

    ol {
      li {
        padding: 5px 0;
      }
    }

    img {
      max-width: 100%;
    }
  }
}

.dividingLine {
  width: 100%;
  height: 30px;
  font-size: 20px;
  text-align: center;
  position: relative;
  padding: 30px 0;
}

.dividingLine::before {
  content: '';
  display: inline-block;
  width: calc(50% - 40px);
  height: 0px;
  border-bottom: 2px dashed #888;
  position: absolute;
  left: 0;
  top: calc(50% - 1px);
}

.dividingLine::after {
  content: '';
  display: inline-block;
  width: calc(50% - 40px);
  height: 0px;
  border-bottom: 2px dashed #888;
  position: absolute;
  right: 0;
  top: calc(50% - 1px);
}

.code code {
  border-radius: 5px;
}
</style>
