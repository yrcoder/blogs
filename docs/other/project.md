mock 和上传文件会冲突

```html
<tr>
    <th>检查结论</th>
    <td colspan="4">
        <textarea v-model="info.inspectResult"
                    :readonly="readonly" />

    </td>
</tr>
<style>
    /* textarea display 为 inline, 此时th 的字体会在最下面，block时才会起来*/
    textarea {
        display: block;
        width: 500px;
        height: 50px;
        border: none;
        resize: none;
    }
</style>
```
