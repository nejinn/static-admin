export default [
  {
    _type: "b-row",
    _children: [
      {
        _type: "b-col",
        lg: 6,
        _class: "my-1",
        _children: [
          {
            _type: "b-form-group",
            label: "项目名称",
            labelColsSm: "3",
            labelAlignSm: "right",
            labelSize: "sm",
            labelFor: "filterName",
            _class: "mb-0",
            _children: [
              {
                _type: "b-input-group",
                size: "sm",
                _children: [
                  {
                    _type: "b-form-input",
                    vModel: "filterForm.filterName",
                    type: "text",
                    id: "filterName",
                    placeholder: "请输入项目名称"
                  },
                  {
                    _type: "b-input-group-append",
                    _children: [
                      {
                        _type: "b-button"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];
