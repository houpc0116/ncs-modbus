from flask import Blueprint, render_template, redirect, url_for

class HTML_DASHBOARD(Blueprint):
    def __init__(self, name,DB):
        super().__init__(name, __name__)
        self.mydb = DB

        @self.route('/dashboard/<string:db_id>', methods=['GET'])
        @self.route('/dashboard', methods=['GET'])
        def dashboardPage(db_id=None):
            # 更改這裡
            # scene data (第一層)
            scene_data = [
                {
                  "_id": "67aeec93d9d0577fc116127c",
                  "scene": "3F空氣盒子"
                },
                {
                  "_id": "67aeed03d9d0577fc116127d",
                  "scene": "教室2"
                },
                {
                  "_id": "67aeed40d9d0577fc116127e",
                  "scene": "教室3"
                }
            ]

            # Tabs data (第二層)
            tabs_data = [{
              "_id": "67b57b55839cf7f31f9f913b",
              "scene_db_id": "67aeec93d9d0577fc116127c",
              "name": "電錶"
            },
            {
              "_id": "67b57bad839cf7f31f9f913c",
              "scene_db_id": "67aeec93d9d0577fc116127c",
              "name": "電錶1"
            },
            {
              "_id": "67b57bba839cf7f31f9f913f",
              "scene_db_id": "67aeec93d9d0577fc116127c",
              "name": "電錶2"
            },
            {
              "_id": "67b57bce839cf7f31f9f9142",
              "scene_db_id": "67aeec93d9d0577fc116127c",
              "name": "電錶3"
            },
            {
              "_id": "67b57bd4839cf7f31f9f9143",
              "scene_db_id": "67aeec93d9d0577fc116127c",
              "name": "電錶4"
            },
            {
              "_id": "67b57bdd839cf7f31f9f9144",
              "scene_db_id": "67aeec93d9d0577fc116127c",
              "name": "電錶5"
            },
            {
              "_id": "67b57d41839cf7f31f9f9147",
              "scene_db_id": "67aeec93d9d0577fc116127c",
              "name": "電錶6"
            },
            {
              "_id": "67b57d52839cf7f31f9f9148",
              "scene_db_id": "67aeec93d9d0577fc116127c",
              "name": "電錶7"
            },
            {
              "_id": "67b57d5f839cf7f31f9f9149",
              "scene_db_id": "67aeec93d9d0577fc116127c",
              "name": "電錶8"
            },
            {
              "_id": "67b57d66839cf7f31f9f914a",
              "scene_db_id": "67aeec93d9d0577fc116127c",
              "name": "電錶9"
            },
            {
              "_id": "67b57d6c839cf7f31f9f914b",
              "scene_db_id": "67aeec93d9d0577fc116127c",
              "name": "電錶10"
            },
            {
              "_id": "67b57d72839cf7f31f9f914c",
              "scene_db_id": "67aeec93d9d0577fc116127c",
              "name": "電錶11"
            }]

            

            # 搜尋符合 Scene 的ITEM
            result = [item for item in scene_data if item.get("_id") == db_id]
            # 如果没有找到，返回原始列表
            result = result if result else scene_data[0]
            filter_tabs = [item for item in tabs_data if item.get("scene_db_id") == db_id]
            filter_tabs = filter_tabs if filter_tabs else tabs_data[0]
            #print(filter_tabs)
            # param: sceneList(場景列表), page(目前所選擇的場景), tabs(頁籤列表), specifytab(目前指定的頁籤)
            item = {
                "sceneList": scene_data,
                "page": result,
                "tabs": tabs_data,
                "specifytab": filter_tabs
            }
            print(item)

            return render_template('dashboard.html', data=item)