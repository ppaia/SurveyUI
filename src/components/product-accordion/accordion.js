import React from 'react';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import pinterest from '../../assets/images/pinterest.png';
import email from '../../assets/images/email.png';
import 'react-accessible-accordion/dist/fancy-example.css';
import './accordion.css';

export default class ProductAccordion extends React.Component {
    render() {
        let DefaultActiveKey = "0";
        return (
            <div id="accord">
                <Accordion preExpanded={[DefaultActiveKey]} allowMultipleExpanded ="true" allowZeroExpanded="true">
                    <AccordionItem  uuid={DefaultActiveKey}>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                <b>  Product Details </b>
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel className="description">
                            {this.props.product.detail.description}
                            <ul id="lineSpacing" >
                                {this.props.product.detail.bulletText.map((type,index) => {
                                    return (
                                        <li key={index}>{type}</li>
                                    )
                                })}
                                <li>Web ID: {this.props.product.id}</li>
                            </ul>
                        </AccordionItemPanel>
                    </AccordionItem>
                    <AccordionItem uuid="1">
                        <AccordionItemHeading>
                            <AccordionItemButton>
                               <b> Price Details </b>
                        </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <div id="setSize">{(this.props.product && this.props.product.pricing && this.props.product.pricing.price)? this.props.product.pricing.price.priceType.text : ""}</div>
                            <div id="priceTag" >
                                <b style={{ color: "red" }}> Now {(this.props.product && this.props.product.pricing && this.props.product.pricing.price && this.props.product.pricing.price.tieredPrice[1])? this.props.product.pricing.price.tieredPrice[1].values[0].formattedValue: ""}
                                </b>&nbsp;
                            Orig. {(this.props.product && this.props.product.pricing)? this.props.product.pricing.price.tieredPrice[0].values[0].formattedValue: ""}
                            </div>
                        </AccordionItemPanel>
                    </AccordionItem>
                    <AccordionItem uuid="2">
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                <b> Special Offers </b>
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <div>
                                {(this.props.product && this.props.product.pricing)? 
                                Object.keys(this.props.product.pricing.badgesMap).map((type, index) => {
                                    return (
                                        <div key={index}>
                                            {index !== 0 ? <hr></hr> : ""}
                                            <span id="setColor">{this.props.product.pricing.badgesMap[type].header.toUpperCase()}</span><br></br>
                                            <span id="descText">{this.props.product.pricing.badgesMap[type].checkoutDescription}</span><br></br><br></br>
                                            <span id="descText">{this.props.product.pricing.badgesMap[type].legalDisclaimer}</span>
                                        </div>
                                    )
                                })
                            :""}
                            </div>
                        </AccordionItemPanel>
                    </AccordionItem>
                    <AccordionItem uuid="3">
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                <b>  Shipping & Returns </b>
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <div>
                                <ul id="shippingTerms">
                                    {Object.keys(this.props.product.shipping).map((type,index) => {
                                        return (
                                            <li key={index}>{this.props.product.shipping[type]}</li>
                                        )
                                    })}
                                    <li>For complete details, read our <a href="#" id="policyTerms">Shipping</a> and 
                                    <a href="#" id="policyTerms"> Return policies.</a>
                                    </li>
                                </ul>
                            </div>
                        </AccordionItemPanel>
                    </AccordionItem>
                </Accordion>
                <div data-el="social-icons" role="region">
                    <div>
                        <div className="icons">
                            <div
                                role="button"
                                aria-label="send an email"
                                className="email-share"
                                data-auto="social-icon-email"
                            >
                                <div className="icon-social-email-large email">
                                    <img src={email} alt="Email icon" />
                                </div>
                            </div>
                            <div
                                role="button"
                                aria-label="share pinterest"
                                className="pinterest-share"
                                data-auto="social-icon-pinterest"
                            >
                                <div className="icon-social-pinterest-large pinterest">
                                    <img src={pinterest} alt="Pinterest  icon" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}