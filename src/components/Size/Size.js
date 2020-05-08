import React, { Component } from 'react';
import { Collapse, Button } from 'react-bootstrap';
import classes from './Size.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Size extends Component {
    state = {
        open: false,
        sizeSelected:'Please Select'
    }

    expandSize(openState) {
        this.props.expandSizeFn(openState);
    }
    render() {
        return (
            <div>
                <span>Size: <b>{this.state.sizeSelected}</b></span>

                <span className={classes.spanSlash}> | </span><a href="#" className={classes.sizeChart}>Size Chart</a>
                {!this.props.expandSize ?
                    <span className={classes.span}
                        onClick={
                            () => this.expandSize(true)
                        }
                        aria-controls="example-collapse-text"
                        aria-expanded={this.props.expandSize}>
                        See All Sizes <br /><FontAwesomeIcon icon="angle-down" />
                    </span> :
                    <span className={classes.span}
                        onClick={
                            () => this.expandSize(false)
                        }
                        aria-controls="example-collapse-text"
                        aria-expanded={this.props.expandSize}>
                        See Fewer Sizes <br /> <FontAwesomeIcon icon="angle-up" />
                    </span>
                }
                {this.props.sizeMap ?
                    <div>
                        <Collapse in={true}>
                            <span className={classes.sizeList}>{Object.keys(this.props.sizeMap).slice(0, 5).map((size, index) => (
                                <Button variant="light" key={index} disabled={this.props.sizeMap[size].colors.indexOf(this.props.SelectedColor.id) > -1 ? "" : "disabled"}
                                    className={[classes.ButtonSize, (this.props.sizeMap[size].colors.indexOf(this.props.SelectedColor.id) > -1 ? classes.ActiveSize : classes.InactiveSize)]}
                                    onClick={()=>this.setState({sizeSelected:this.props.sizeMap[size].displayName})}

                                >
                                    {this.props.sizeMap[size].displayName}
                                </Button>
                                // console.log(size)
                            ))}
                            </span>
                        </Collapse>
                        <Collapse in={this.props.expandSize}>
                            <span className={classes.sizeList}>{Object.keys(this.props.sizeMap).slice(5, Object.keys(this.props.sizeMap).size).map((size, index) => (
                                <Button variant="light" key={index} disabled={this.props.sizeMap[size].colors.indexOf(this.props.SelectedColor.id) > -1 ? "" : "disabled"}
                                    className={[classes.ButtonSize, (this.props.sizeMap[size].colors.indexOf(this.props.SelectedColor.id) > -1 ? classes.ActiveSize : classes.InactiveSize)]}
                                    onClick={()=>this.setState({sizeSelected:this.props.sizeMap[size].displayName})}>
                                    {this.props.sizeMap[size].displayName}
                                </Button>
                                // console.log(size)
                            ))}
                            </span>
                        </Collapse>
                    </div>
                    : ''}
            </div>
        );
    }
}
export default Size;
