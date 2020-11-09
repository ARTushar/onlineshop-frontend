import React from 'react';
import '../assets/css/Category.css';
import { ProSidebar, SidebarContent, Menu, MenuItem, SubMenu, SidebarHeader} from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { Drawer } from '@material-ui/core'
import { useHistory } from 'react-router-dom';

function Category({categories}) {

  const history = useHistory();

  const [open, setOpen] = React.useState(false);

  const slugify = (name) => {
    return name.split(' ').join('-');
  }

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(open);
  };

  return (
    // <div className="category">
    <>
      <span style={{
        fontSize: "small"
      }} onClick={toggleDrawer(true)}>Categories</span>
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        <ProSidebar style={{
          zIndex: 100000
        }}>
          <SidebarHeader style={{
            padding: "10px",
            textWeight: "600"
          }}>
            Categories
        </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="square">
              {categories.map(category => (
                <SubMenu key={category.name} title={category.name}>
                  {category.subCategory.map(subcat => (
                    <MenuItem key={subcat} onClick={() => history.push('/category/' + slugify(subcat))}>
                      {subcat}
                    </MenuItem>
                  ))}
                </SubMenu>
              ))}
            </Menu>
          </SidebarContent>
        </ProSidebar>
      </Drawer>
      </>
    // </div>
  )
}

export default Category;
