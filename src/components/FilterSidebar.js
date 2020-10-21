import React from 'react';
import { ProSidebar, SidebarContent, Menu, MenuItem, SubMenu, SidebarHeader} from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import {Input, Button as Button2, ButtonToggle, UncontrolledCollapse } from 'reactstrap';
import { Drawer, Button } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel'


function FilterSidebar({filterProducts}) {
  const [minPrice, setMinPrice] = React.useState("");
  const [maxPrice, setMaxPrice] = React.useState("");
  const [rating, setRating] = React.useState(0)
  const [open, setOpen] = React.useState(false);
  const [errMess, setErrMess] = React.useState(null);

  const applyFilter = () => {
    if (minPrice !== '' && maxPrice !== '' && minPrice > maxPrice) {
      setErrMess('Minimum Price cannot be greater than maximum price');
      return;
    }

    filterProducts(minPrice, maxPrice, rating);

  }

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
                  setRating(0)
                }} >0 or more</MenuItem>
                <MenuItem onClick={() => {
                  setRating(1)
                }} >1 or more</MenuItem>
                <MenuItem onClick={() => {
                  setRating(2)
                }}>2 or more</MenuItem>
                <MenuItem onClick={() => {
                  setRating(3)
                }}>3 or more</MenuItem>
                <MenuItem onClick={() => {
                  setRating(4)
                }}>4 or more</MenuItem>
                <MenuItem onClick={() => {
                  setRating(5)
                }}>5</MenuItem>
              </SubMenu>
              <MenuItem>
                <Button2 onClick={applyFilter} style={{
                  width: "100%",
                  marginTop: "10px"
                }}>Apply Filter</Button2>
              </MenuItem>
            </Menu>
          </SidebarContent>
        </ProSidebar>
      </Drawer>
    </React.Fragment>
  )
};

export default FilterSidebar
