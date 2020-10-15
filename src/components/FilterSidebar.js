import React from 'react';
import { ProSidebar, SidebarContent, Menu, MenuItem, SubMenu, SidebarHeader} from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import {Input, ButtonToggle, UncontrolledCollapse } from 'reactstrap';
import { Drawer, Button } from '@material-ui/core';

function FilterSidebar() {
  const [minPrice, setMinPrice] = React.useState("");
  const [maxPrice, setMaxPrice] = React.useState("");
  const [rating, setRating] = React.useState()
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(open);
  };

  React.useEffect(() => {
    console.log(`minPrice: ${minPrice} maxPrice: ${maxPrice} rating: ${rating}`);
  })

  return (
    <React.Fragment>
      <Button style={{
      }} onClick={toggleDrawer(true)}>Filter</Button>
          <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
            <ProSidebar style={{
            zIndex: 100000
          }}>
          <SidebarHeader style={{
            padding: "10px",
            textWeight: "600"
          }}>
            Filter
        </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="square">
              <SubMenu title="Price">
                <MenuItem>
                  <Input
                    placeholder='Minimum Price'
                    className='filter__price__limit'
                    value={minPrice}
                    onChange={(e) =>
                      setMinPrice(e.target.value.replace(/\D/, ''))
                    }
                  />
                </MenuItem>
                <MenuItem>
                  <Input
                    placeholder='Maximum Price'
                    className='filter__price__limit'
                    value={maxPrice}
                    onChange={(e) =>
                      setMaxPrice(e.target.value.replace(/\D/, ''))
                    }
                  />
                </MenuItem>
              </SubMenu>
              <SubMenu title="Rating">
                <MenuItem onClick={() => {
                  // setRatingSubmenuOpen(!ratingSubmenuOpen)
                  setRating(1)
                }} >1+</MenuItem>
                <MenuItem onClick={() => {
                  // setRatingSubmenuOpen(!ratingSubmenuOpen)
                  setRating(2)
                }}>2+</MenuItem>
                <MenuItem onClick={() => {
                  // setRatingSubmenuOpen(!ratingSubmenuOpen)
                  setRating(3)
                }}>3+</MenuItem>
                <MenuItem onClick={() => {
                  // setRatingSubmenuOpen(!ratingSubmenuOpen)
                  setRating(4)
                }}>4+</MenuItem>
                <MenuItem onClick={() => {
                  // setRatingSubmenuOpen(!ratingSubmenuOpen)
                  setRating(5)
                }}>5</MenuItem>
              </SubMenu>
            </Menu>
          </SidebarContent>
        </ProSidebar>
      </Drawer>
    </React.Fragment>
  )
};

export default FilterSidebar
