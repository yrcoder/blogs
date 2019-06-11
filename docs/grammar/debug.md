# 调试

## console

中断节点更改--在 Chrome 控制台中，右击该元素，然后在设置中选择中断（Break on）

## 控制台

1. DOM 元素的控制台书签：Chrome 开发者工具和 Firebug 都提供了书签功能，用于显示你在元素标签页（Chrome）或 HTML 标签页（Firebug）中最后点击的 DOM 元素。如果你依次选择了 A 元素 B 元素和 C 元素，那么$0 表示C元素，$1 表示 B 元素，$2表示A元素（这个和正则表达式的$符号类似，不过顺序不同）。

2. 如果你想调试 f 函数，用 debug(f)语句可以增加这种断点。

3. Sources 标签页左侧面板上有一个代码片段（Snippet）子标签页，可用于保存代码片段，帮你调试代码。

4. 可以用 Chrome 开发者工具 Sources 标签页中的格式化按钮（Pretty Print Button）格式化压缩后的代码。

5. 在 Network 面板，选择一个资源文件，右键 Copy Response 可快速复制响应内容。

6. 利用媒体查询，这个主要是在 Device Mode 调节不同的分辨率显示。

7. 选择 Elements，按 Esc > Emulation > Sensors 进行传感器模拟。

8. 点击渐入效果样式图标（紫色图标），可以预览动画效果，并可对相应的贝塞尔曲线(cubic-bezier)进行调节动画效果。

9. 在 Source 中按住 Alt 键并拖动鼠标进行多列内容选择。

10. Elements 面板右键执行 DOM 元素节点，选择 Force Element State 或者点击右侧 Toggle Element State 图标可以出发伪类。

11. Network 面板中选择一张图片，在右侧图片上鼠标右键选择 copy it as a Data URI,就可以获取图片的 Data URL (base64 编码)。

12. 通过按住 Ctrl 键可以添加多个编辑光标，同时对多处进行编辑。按下 Ctrl + U 可以撤销编辑。

13. Elements 面板右侧的 Style 编辑器中，点击颜色十六进制编码前的小色块，会弹出一个调色板。

14. 按下 Alt 键并且鼠标双击选择 DOM 元素前面的箭头，就会展开该 DOM 元素下的所有字节点元素.

15. 快捷键：
    - 快速定位到行：快捷键 Ctrl+O(Mac:CMD+O)，输入：行号:列号 来进行定位
    - 元素搜索：快捷键 Ctrl+F(Mac:CMD+F)，试试在搜索栏输入 ID 选择符或者类选择符就可以定位到元素啦

## 小东西

-   Scroll Into View -- 在 Elements 标签中，查看页面元素的时候，如果当前这个元素不在视图内，可以通过这个方法让这个元素快速滚入视图中

    -   在 Elements 标签页中选择一个不在视图内的元素
    -   右击，选择 Scrollintoview

-   Copy As Fetch -- 在 Network 标签下的所有的请求，都可以复制为一个完整的 Fetch 请求的代码

    -   在 Network 标签页中，选中一个请求
    -   右击，选择 Copy –>Copyasfetch

-   阻塞请求-在 Network 标签页下，选中一个请求，右击该请求，选择 Blockrequest domain 或 Blockrequest URL，可以分别阻塞该请求所在 domain 下的所有请求 和 该请求

-   手动给元素添加一个点击事件监听--在 debug 的时候，有时候需要在元素的点击事件监听函数中，将该点击事件对象打印出来。有个更方便的方式，是可以直接在 Elements 标签页为页面元素添加事件监听事件

    -   在 Elements 标签页中选中一个页面元素（选中之后，默认可以通过\$0 变量获取到该元素 ）
    -   在 Console 标签页中，调用函数 monitorEvents，输入两个参数，第一个是当前元素（\$0），第二个是事件名（click）
    -   按 Enter 后，当被选中的元素触发了点击事件之后，Console 标签页会将该点击事件对象打印出来

-   拖动页面元素 -- 在 Elements 标签页，你可以拖动任何 HTML 元素，改变它在页面中的位置

-   DOM 断点调试 -- ChromeDevTools 提供了三种针对 DOM 元素的断点调试：子元素改变时、属性改变时 和元素被移除时。

    -   在 Elements 标签页，选中一个元素
    -   右击，选择 Breakon –> subtree modifications (或 attribute modifications 或 node removal )

-   截屏 -- 可以将整个页面截图或者截取部分页面元素，且截取的图片尺寸跟浏览器当前视图中要截取的内容所占尺寸一致。截图输出的是 png 格式的图片，会自动通过浏览器下载到默认的目录下。现在有三种截取的方式：截取整个页面、部分元素 或当前视图。

    -   截取页面部分元素
        -   CMD + SHIFT + P ( windows 中用 CTRL + SHIFT + P ) 打开命令菜单
        -   在 Elements 标签页，选中要截取的页面元素
        -   选择 Capture node screenshot
    -   截取完整页面的操作
        -   CMD + SHIFT + P (windows 中用 CTRL + SHIFT + P ) 打开命令菜单
        -   选择 Capture full size screenshot （不需要选择页面元素）
    -   截取当前视图内的页面
        -   CMD + SHIFT + P (windows 中用 CTRL + SHIFT + P) 打开命令菜单
        -   选择 Capture screenshot （不需要选择页面元素）

-   缓存上一步操作的结果 --在 ChromeDevTools 上运行 JavaScript 表达式的时候，可以使用\$\_ 来获取到上一步操作的返回值

-   Overrides 重写 -- 在 ChromeDevTools 上调试 css 或 JavaScript 时，修改的属性值在重新刷新页面时，所有的修改都会被重置。如果你想把修改的值保存下来，刷新页面的时候不会被重置，那就看看下面这个特性（Overrides）吧。Overrides 默认是关闭的，需要手动开启，开启的步骤如下。
    -   打开 ChromeDevTools 的 Sources 标签页
    -   选择 Overrides 子标签
    -   选择+Selectfolderforoverrides，来为 Overrides 设置一个保存重写属性的目录
