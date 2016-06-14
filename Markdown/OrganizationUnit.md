#<a id="head"/>ABP.Core.OrganizationUnit

###OrganizationUnit && Core.Location
使用OrganizationUnit实现层次模型：Location（物理位置）

####Vm.organizatinTree 
* [$Tree](/#tree)
* [setUnitCount](/#setUnitCount)
* [refreshUnitCount](/#refreshUnitCount)
* [selectedOu](/#selectedOu)
* [contextMenu](/#contextMenu)
* [addUnit](/#addUnit)
* [openCreateOrEditUnitModal](/#openCreateOrEditUnitModal)
* [generateTextOnTree](/#generateTextOnTree)


#### selectedOu

```
selectedOu: {
    id: null,
    displayName: null,
    code: null,
    set: function (ouInTree) {
        if (!ouInTree) {
            vm.organizationTree.selectedOu.id = null;
            vm.organizationTree.selectedOu.displayName = null;
            vm.organizationTree.selectedOu.code = null;
        } else {
            vm.organizationTree.selectedOu.id = ouInTree.id;
            vm.organizationTree.selectedOu.displayName = ouInTree.original.displayName;
            vm.organizationTree.selectedOu.code = ouInTree.original.code;
        }
        vm.members.load();
    }
}
```


I get 10 times more traffic from [Google] [1] than from
[Yahoo] [2] or [MSN] [3].

  [1]: #head        "Google123"
  [2]: http://search.yahoo.com/  "Yahoo Search"
  [3]: http://search.msn.com/    "MSN Search"
