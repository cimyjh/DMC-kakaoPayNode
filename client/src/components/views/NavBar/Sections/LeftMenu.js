import React from "react";
import { Menu } from "antd";
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
      <Menu.Item key="mail">
        <a href="/">Home</a>
      </Menu.Item>
      <SubMenu title={<span>상품보기</span>}>
        <MenuItemGroup title="투자상품">
          <Menu.Item key="setting:1">
            <a href="/fund">펀드 바로가기</a>
          </Menu.Item>
          <Menu.Item key="setting:2">
            <a href="/realestate">부동산 상품 바로가기</a>
          </Menu.Item>
        </MenuItemGroup>
      </SubMenu>
      <SubMenu title={<span>상품 등록하기</span>}>
        <MenuItemGroup title="투자상품 등록">
          <Menu.Item key="setting:1">
            <a href="/fund/upload">펀드 등록하기</a>
          </Menu.Item>
          <Menu.Item key="setting:2">
            <a href="/realestate">부동산 상품 등록하기</a>
          </Menu.Item>
        </MenuItemGroup>
      </SubMenu>
    </Menu>
  );
}

export default LeftMenu;
