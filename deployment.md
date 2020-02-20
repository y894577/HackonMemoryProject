# 部署说明
### 下载项目
下载本项目或`git clone https://gitee.com/kenny_chan/tcb_hackthon_memory.git`
### 导入到开发者工具
在微信小程序开发工具中选择该项目根目录并导入
### 部署项目基本信息
修改appid
project.config.json里修改appid

```
{
    // ...
    "appid": "自己的appid"
    // ...
}
```

### 部署云开发
部署`/cloudfunctions`中的云函数
### 云开发数据库结构
- Community 社区信息表 权限：所有用户可读，仅创建者可写
- Records 出入记录表 权限：所有用户可读，仅创建者可写
- User 用户信息表 权限：所有用户可读，仅创建者可写
#### 数据库集合
##### Community
| field         | type   |
| ------------- | ------ |
| _id           | string |
| comID         | string |
| comManageName | string |
| comManageTel  | int    |
| comName       | string |
| comQRcode     | string |
| records       | array  |

##### Records
| field             | type   |
| ----------------- | ------ |
| _id               | string |
| passTime          | date   |
| passerDestination | string |
| passerName        | string |
| passerTel         | int    |
| temp              | double |

##### Records
| field           | type   |
| --------------- | ------ |
| _openid         | string |
| _id             | string |
| manageComOpenid | string |
| records         | array  |


### Bug 反馈
如果有 Bug ，请通过issue、底部点评，或者下面的联系方式反馈，非常感谢你的反馈！
### 联系方式
有任何问题，可以通过下方的联系方式联系我。
- 邮箱：kenny.yb.chan@outlook.com
### 详细介绍
关于项目的详细介绍请查看[README.md](https://gitee.com/kenny_chan/tcb_hackthon_memory/blob/%E7%89%88%E6%9C%AC1/README.md)