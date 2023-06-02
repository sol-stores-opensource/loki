import React, {useState} from 'react';
import {Modal} from './Modal';
import s from '../styles/legal-modal.module.scss';
import {useAppContext} from './AppContext';
import {classNames} from '../utils';

export const LegalModal = ({closeModal, callback, channel}) => {
  const {setLegalAccepted} = useAppContext();
  const [legalChecked, setlegalChecked] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (legalChecked) {
      const terms_accepted_ms = Date.now();
      console.log('terms_accepted', {terms_accepted_ms});
      channel.push('terms_accepted', {terms_accepted_ms}, 10000).receive('ok', (data: any) => {
        if (data?.ok) {
          setLegalAccepted(true);
          callback.callback();
          closeModal();
        }
      });
    }
  };

  const handleChecked = () => {
    setlegalChecked(!legalChecked);
  };

  return (
    <Modal alignTop={false} closeModal={closeModal}>
      <div className={s.legal_modal}>
        <div className={s.inner_container}>
          <h2 className={s.headline}>DISCLAIMERS</h2>
          <ul className={s.bullets}>
            <li>
              • Solana Spaces is not an investment, financial, legal or other advisor. All information and content is
              provided for information, education, and entertainment purposes only, and does not constitute financial,
              tax or legal advice or any other type of advice, or an offer, solicitation, invitation or recommendation
              to buy or sell any digital assets.
            </li>
            <li>
              • Solana Spaces is compensated by Solana ecosystem participants (SEPs) in exchange for providing the
              in-store platform for them to display and inform you about their products and services.
            </li>
            <li>
              • All third-party content is provided by the applicable SEP. Solana Spaces bears no responsibility for the
              accuracy, legality or content of, and does not endorse, recommend, or approve of, any third party product,
              service, content, external site or subsequent links. Contact the applicable SEP with any questions.
            </li>
          </ul>
          <p style={{color: '#000'}}>
            <strong>
              To acknowledge and agree with the above disclaimers and acknowledge that you have read, understand and
              agree with the Solana Spaces Terms of Use, the full text of which is below, click the button next to “I
              have read, understand and agree with all of the terms and conditions” below.
            </strong>
          </p>
          <div className={s.legal_container}>
            <h1>
              <strong>Solana Spaces Terms of Use Agreement</strong>
            </h1>
            <br />
            <h3>
              <strong>Effective Date: September 9, 2022</strong>
            </h3>
            <br />
            <p>
              PLEASE READ THIS TERMS OF USE AGREEMENT (&quot;<strong>AGREEMENT</strong>&quot;) CAREFULLY. THIS AGREEMENT
              IS A LEGAL CONTRACT BETWEEN YOU (&quot;<strong>USER</strong>&quot;) AND SOL STORES, Inc. (&quot;
              <strong>Solana Spaces,</strong>&quot; &quot;<strong>COMPANY,</strong>&quot; &quot;<strong>WE,</strong>
              &quot; OR &quot;<strong>US</strong>&quot;).
            </p>
            <p>
              <strong>
                PLEASE BE AWARE THAT SECTION 16 CONTAINS PROVISIONS GOVERNING HOW TO RESOLVE DISPUTES BETWEEN YOU AND
                SOLANA SPACES. AMONG OTHER THINGS, SECTION 16 INCLUDES AN AGREEMENT TO ARBITRATE WHICH REQUIRES, WITH
                LIMITED EXCEPTIONS, THAT ALL DISPUTES BETWEEN YOU AND US SHALL BE RESOLVED BY BINDING AND FINAL
                ARBITRATION. SECTION 16 ALSO CONTAINS A CLASS ACTION AND JURY TRIAL WAIVER. PLEASE READ SECTION 16
                CAREFULLY.
              </strong>
            </p>
            <p>
              <strong>
                UNLESS YOU OPT OUT OF THE AGREEMENT TO ARBITRATE WITHIN 30 DAYS: (1) YOU WILL ONLY BE PERMITTED TO
                PURSUE DISPUTES OR CLAIMS AND SEEK RELIEF AGAINST US ON AN INDIVIDUAL BASIS, NOT AS A PLAINTIFF OR CLASS
                MEMBER IN ANY CLASS OR REPRESENTATIVE ACTION OR PROCEEDING AND YOU WAIVE YOUR RIGHT TO PARTICIPATE IN A
                CLASS ACTION LAWSUIT OR CLASS-WIDE ARBITRATION; AND (2) YOU ARE WAIVING YOUR RIGHT TO PURSUE DISPUTES OR
                CLAIMS AND SEEK RELIEF IN A COURT OF LAW AND TO HAVE A JURY TRIAL.
              </strong>
            </p>
            <p>
              By accessing or using solanaspaces.com, or any other Solana Spaces website, web portal, application,
              instore or other interactive display, or any with an authorized link to this Agreement (&quot;
              <strong>each, a Website</strong>&quot;), registering an account or accessing or using any content,
              information, services, features or resources available or enabled via the Website (collectively, the
              &quot;
              <strong>Services</strong>&quot;), or clicking on a button or taking another action to signify your
              acceptance of this Agreement, you: (1) agree to be bound by this Agreement and any future amendments and
              additions to this Agreement as published through the Services; (2) represent you are of legal age in your
              jurisdiction of residence to form a binding contract; and (3) represent that you have the authority to
              enter into this Agreement personally and, if applicable, on behalf of any company, organization or other
              legal entity on whose behalf you use the Services. 
              <strong>
                Except as otherwise provided herein, if you do not agree to be bound by this Agreement, you may not
                access or use the Services.
              </strong>
               
            </p>
            <p>
              Your use of the Services is also subject to any additional terms, conditions and policies that we
              separately post on the Services and any agreements that you have separately executed with Solana Spaces
              (&quot;<strong>Supplemental Terms</strong>&quot;) which are incorporated by reference into this
              Agreement. To the extent there is any conflict between this Agreement and the Supplemental Terms, the
              Supplemental Terms will control with respect to the subject matter of such agreement. For example, if you
              are a company who has executed a separate agreement with Solana Spaces (&quot;
              <strong>Spaces Agreement</strong>&quot;), the terms of that Spaces Agreement will control and supersede
              this Agreement with respect to the subject matter of such Spaces Agreement.
            </p>
            <p>
              The information provided on the Website is not intended for distribution to or use by any person or entity
              in any jurisdiction or country where such distribution or use would be contrary to law or regulation or
              which would subject us to any registration requirement within such jurisdiction or country. Accordingly,
              those persons who choose to access the Website from other locations do so on their own initiative and are
              solely responsible for compliance with local laws, if and to the extent local laws are applicable.
            </p>
            <p>
              Subject to Section 16.9 of this Agreement, Solana Spaces reserves the right to modify this Agreement or
              its policies relating to the Services at any time, effective upon posting of an updated version of this
              Agreement or any applicable Supplemental Terms on the applicable Services. You should regularly review
              this Agreement, as your continued use of the Services after any such changes constitutes your agreement to
              such changes.
            </p>
            <br />
            <ol>
              <li>
                <p>
                  <strong>Registration.</strong> When registering an account for the Services (&quot;
                  <strong>Account</strong>&quot;), you agree to provide only true, accurate, current and complete
                  information requested by the registration form (the &quot;<strong>Registration Data</strong>&quot;)
                  and to promptly update the Registration Data thereafter as necessary. You represent that you are not
                  barred from using the Services under any applicable law and that you will be responsible for all
                  activities that occur under your Account. You agree to monitor your Account to restrict its use by
                  minors and other unauthorized users and agree not to share your Account or password with anyone. You
                  further agree to notify Solana Spaces immediately of any unauthorized use of your password or any
                  other breach of the security of your Account and to exit from your Account at the end of each session.
                  You agree not to create an Account using a false identity or alias or if you previously have been
                  banned from using any of the Services. You further agree that you will not maintain more than one
                  Account for the same Solana Spaces service at any given time. Solana Spaces reserves the right to
                  remove or reclaim any usernames at any time and for any reason. You acknowledge and agree that you
                  have no ownership or other property interest in your Account and that all rights in and to your
                  Account are owned by and inure to the benefit of Solana Spaces. 
                </p>
              </li>
              <li>
                <p>
                  <strong>Order Process.</strong> 
                </p>
                <p>
                  <strong>2.1 Order Acceptance.</strong>  Each part of any order that you submit to Solana Spaces
                  constitutes an offer to purchase. If you do not receive a message from Solana Spaces confirming
                  receipt of your order, please contact our Customer Service department at support\@solanaspaces.com
                  before re-entering your order. Solana Spaces&#x27; confirmation of receipt of your order does not
                  constitute Solana Spaces\&#x27; acceptance of your order. Solana Spaces is only deemed to have
                  accepted your order once the product(s) you ordered have been shipped (the &quot;
                  <strong>Product</strong>&quot;).
                </p>
                <p>
                  <strong>2.2 Order Issues.</strong>  Although we strive to accept all valid orders, Solana Spaces
                  reserves the right to deny any order for any reason, including if: (i) we discover an error in pricing
                  and/or other information about the Product or receive insufficient or erroneous billing, payment,
                  and/or shipping information, (ii) we suspect an order has been placed using stolen payment card
                  information or otherwise appears to be connected to fraud, or (iii) the ordered Product is unavailable
                  due to discontinuance or otherwise. We may also refuse any order that is connected with a previous
                  payment dispute. 
                </p>
                <p>
                  <strong>2.3 Order Cancellation.</strong>  If any Product is discontinued or otherwise becomes
                  unavailable, Solana Spaces reserves the right to cancel your order and provide you a refund for the
                  amount paid for the Product.
                </p>
                <p>
                  <strong>2.4 Restrictions on Resale.</strong> To protect the intellectual property rights of Solana
                  Spaces and its licensors and suppliers, any resale of Products for personal and/or business profit is
                  strictly prohibited. Solana Spaces reserves the right to decline any order that we deem to possess
                  characteristics of reselling.
                </p>
              </li>
              <li>
                <p>
                  <strong>Fees and Purchase Terms.</strong> 
                </p>
                <p>
                  <strong>3.1 Payment.</strong>  You agree to pay for all orders made from your Account in accordance
                  with the prices and billing terms in effect at the time an order is made from your Account. You also
                  agree to pay all applicable taxes. To make an order through the Services, you must provide valid
                  payment information. By providing your payment information, you agree that Solana Spaces is authorized
                  to immediately invoice, charge and/or debit your Account for all fees and charges due and payable to
                  Solana Spaces hereunder and that no additional notice or consent is required. You agree to immediately
                  notify Solana Spaces of any change in your billing address, debit card, credit card, or other relevant
                  payment account information. Solana Spaces uses Decaf (&quot;
                  <strong>Payment Services Provider</strong>&quot;) as a third-party service provider for payment
                  services (e.g., credit card transaction processing, crypto-currency payments, merchant settlement, and
                  related services). By using the Services, you hereby consent and authorize Solana Spaces and Payment
                  Services Provider to share any information and payment instructions you provide to complete your
                  transactions. You agree to immediately notify Solana Spaces of any change in your payment information
                  by sending an e-mail to support\@SolanaSpaces.com. Solana Spaces reserves the right at any time to
                  change its prices and billing methods. Please contact support\@SolanaSpaces.com regarding any billing
                  disputes.
                </p>
                <p>
                  <strong>3.2 Refunds.</strong> Except as set forth in any separate refund policy posted on the
                  Services, all fees are non-refundable. 
                </p>
                <p>
                  <strong>3.3 Discounts and Promo Codes.</strong>  We may, in our sole discretion, create discounts and
                  promotional codes that may be redeemed for credit in your Account, or other features or benefits,
                  subject to any additional terms that we establish on a per promotional code basis (&quot;
                  <strong>Promo Codes</strong>&quot;). Promo Codes may only be used once per person. Only Promo Codes
                  sent to you through official Solana Spaces communications channels are valid. You agree that Promo
                  Codes: (i) must be used for the intended audience and purpose, and in a lawful manner; (ii) may not be
                  duplicated, sold, or transferred in any manner, or made available to the general public (whether
                  posted to a public forum or otherwise), unless expressly permitted by us; (iii) may be disabled by us
                  at any time for any reason without liability to us; (iv) may only be used pursuant to the specific
                  terms that we establish for such Promo Code; (v) are not redeemable for cash; and (vi) may expire
                  prior to your use.
                </p>
              </li>
              <li>
                <p>
                  <strong>User Content.</strong> 
                </p>
                <p>
                  <strong>4.1 Responsible Party for Content.</strong> You acknowledge that all content on the Website is
                  the sole responsibility of the party from whom such content originated. This means that each User is
                  entirely responsible for all content that that User makes available through the Services (&quot;
                  <strong>User Content</strong>&quot;). Solana Spaces has no obligation to pre-screen any content. You
                  use all User Content and interact with other Users at your own risk. Without limiting the foregoing,
                  Solana Spaces reserves the right in its sole discretion to pre-screen, refuse, or remove any content.
                  Solana Spaces shall have the right to remove any content that violates this Agreement or is otherwise
                  objectionable to Solana Spaces. 
                </p>
                <p>
                  <strong>4.2 Ownership of Your Content.</strong>  Solana Spaces does not claim ownership of any User
                  Content you make available on the Services (&quot;<strong>Your Content</strong>&quot;). However, when
                  you as a User post or publish Your Content on or in the Services, you represent that you have all of
                  the necessary rights to grant Solana Spaces the license set forth below in Section 4.3. Except with
                  respect to Your Content, you agree that you have no right or title in or to any content that appears
                  on or in the Services. 
                </p>
                <p>
                  <strong>4.3 License to Your Content.</strong> Subject to any applicable Account settings that you
                  select, you grant Solana Spaces a right to use and display Your Content (in whole or in part) for its
                  own business purposes, including without limitation, to operate and improve the Services, analyze
                  Users&#x27; use of the Services, and develop new products and services. Note that other Users may
                  search for, see, use, modify and reproduce any of Your Content that you submit to any
                  &quot;public&quot; area of the Services. 
                </p>
                <p>
                  <strong>4.4 Other Restrictions on User Conduct.</strong> You agree not to use the Services for any
                  purpose prohibited by this Agreement or by applicable law. You shall not (and shall not permit any
                  third-party to) (a) take any action or (b) make available any content on or through the Services that:
                  (i) infringes any patent, trademark, trade secret, copyright, right of publicity or other right of any
                  person or entity; (ii) is unlawful, threatening, abusive, harassing, defamatory, libelous, deceptive,
                  fraudulent, invasive of another\&#x27;s privacy, tortious, obscene, or profane; (iii) constitutes
                  unauthorized or unsolicited advertising, junk or bulk e-mail; (iv) involves commercial activities
                  and/or sales without Solana Spaces prior written consent, such as contests, sweepstakes, barter,
                  advertising, or pyramid schemes; or (v) impersonates any person or entity, including any employee or
                  representative of Solana Spaces. You may not send any unsolicited e-mail message, commercial or
                  non-commercial, to any e-mail address you have gathered from the Services.
                </p>
              </li>
              <li>
                <p>
                  <strong>Feedback.</strong> You agree that your submission of any ideas, suggestions, documents, and/or
                  proposals to Solana Spaces (&quot;<strong>Feedback</strong>&quot;) is at your own risk and that Solana
                  Spaces has no obligations with respect to such Feedback. You represent and warrant that you have all
                  rights necessary to submit the Feedback. You hereby grant to Solana Spaces the right to use any
                  Feedback in any way at any time without any additional approval or compensation. 
                </p>
              </li>
              <li>
                <p>
                  <strong>Ownership of and License to Use Services.</strong> 
                </p>
                <p>
                  <strong>6.1 Use of the Services.</strong>  Except with respect to User Content, Solana Spaces and its
                  suppliers own all rights, title and interest in the Services. The Services are protected by copyright
                  and other intellectual property laws throughout the world. Subject to this Agreement, Solana Spaces
                  grants you a limited license to use the Services solely for your personal non-commercial purposes. Any
                  future release, update or other addition to the Services shall be subject to this Agreement. Solana
                  Spaces, its suppliers and service providers reserve all rights not granted in this Agreement. 
                </p>
                <p>
                  <strong>6.2 Trademarks.</strong>  Solana Spaces stylized name and other related graphics, logos,
                  trademarks, service marks and trade names used on or in connection with the Services are the property
                  of Solana Spaces and may not be used without our written permission in connection with any third-party
                  products or services. Other trademarks, service marks and trade names that may appear on or in the
                  Services are the property of their respective owners. You will not remove, alter or obscure any
                  copyright notice, trademark, service mark or other proprietary rights notices incorporated in or
                  accompanying the Services. 
                </p>
              </li>
              <li>
                <p>
                  <strong>Fees and Purchase Terms.</strong> 
                </p>
                <p>
                  <strong>7.1 Generally.</strong>  Solana Spaces may, in its discretion, provide users with NFTs minted
                  by and/or on behalf of Solana Spaces (“Solana NFTs”). Solana and its licensees retain all intellectual
                  property rights in and to the Solana NFTs. You may not make derivative works using the Solana NFTs and
                  You agree to cease use of the Solana NFT intellectual property at any time upon request. Solana NFTs
                  may be redeemed for certain rewards or qualify a holder for certain benefits as offered by Solana
                  Spaces and its affiliates and business partners from time to time, and may not be used for any other
                  purpose. Solana NFTs are not legal tender and cannot be reloaded, resold, transferred for value,
                  redeemed for cash or applied to any other account. Solana NFTs are not equivalent to any U.S. dollar
                  amount and may not be converted into U.S. dollars or any other form of currency. Solana Spaces
                  prohibits and does not recognize any purported transfers of Solana NFTs or the purported sale, lease,
                  gift or trade in the “real world” of anything that appears to originate outside of Solana Spaces’
                  Services. Solana NFTs are intangible digital assets that exist only by virtue of the ownership record
                  maintained on a blockchain. Solana Spaces is not responsible for any losses or harms sustained by you
                  due to any transfer of your digital assets on a blockchain, a vulnerability or any kind of failure of
                  digital wallets or blockchains.
                </p>
                <p>
                  <strong>7.2 Solana NFT Transactions.</strong> You are solely responsible for ensuring that you have
                  the correct type and/or amount of Solana NFTs before you attempt to redeem them for any benefits. If
                  you have the incorrect type or an insufficient number of Solana NFTs to complete the applicable
                  transaction, the transaction will be cancelled. All transactions involving Solana NFTs are final and
                  non-refundable.
                </p>
                <p>
                  <strong>7.3 Third-Party NFTs and Digital Assets.</strong>  Our business partners may provide NFTs or
                  other digital assets to You directly as part of their loyalty programs or otherwise. Such activities
                  are third-party activities governed by Section 9 below.
                </p>
              </li>
              <li>
                <p>
                  <strong>Restrictions on Use of Services.</strong> The rights granted to you in this Agreement are
                  subject to the following restrictions: (a) you shall not license, sell, rent, lease, transfer, assign,
                  reproduce, distribute, host or otherwise commercially exploit the Services or any portion of the
                  Services; (b) you shall not frame or use framing techniques to enclose any trademark, service mark,
                  logo or Services (including images, text, page layout or form) of Solana Spaces; (c) you shall not use
                  any metatags or other &quot;hidden text&quot; using Solana Spaces name, service marks, or trademarks;
                  (d) you shall not modify, translate, adapt, merge, make derivative works of, disassemble, decompile,
                  reverse compile or reverse engineer any part of the Services except to the extent the foregoing
                  restrictions are expressly prohibited by applicable law; (e) you shall not use any manual or automated
                  software, devices or other processes (including but not limited to spiders, robots, scrapers,
                  crawlers, avatars, data mining tools or the like) to &quot;scrape&quot; or download data from the
                  Services (except that we grant the operators of public search engines revocable permission to use
                  spiders to copy materials from the Website for the sole purpose of and solely to the extent necessary
                  for creating publicly available searchable indices of the materials, but not caches or archives of
                  such materials); (f) you shall not access the Services to build a similar or competitive website,
                  application or service; (g) except as expressly stated herein, no part of the Services may be copied,
                  reproduced, distributed, republished, downloaded, displayed, posted or transmitted in any form or by
                  any means; (h) you shall not remove or destroy any copyright notices or other proprietary markings
                  contained on or in the Services; (i) you shall not interfere with or attempt to interfere with the
                  proper functioning of the Services or use the Services in any way not expressly permitted by this
                  Agreement; (j) you shall not use or access the digital wallets of third parties without their
                  permission, (k) offer for sale or sell counterfeit non-fungible tokens, (l) you shall not carry out
                  any illegal activities, including, without limitation, money laundering or terrorist financing, (m)
                  you shall not engage in or knowingly facilitation of any &quot;front-running,&quot; &quot;wash
                  trading,&quot; &quot;pump and dump trading,&quot; &quot;ramping,&quot; &quot;cornering,&quot; or
                  fraudulent, deceptive or manipulative trading activities; and (n) you shall not attempt to harm our
                  Services, including but not limited to, by violating or attempting to violate any related security
                  features, introducing viruses, worms, or similar harmful code into the Services, or interfering or
                  attempting to interfere with use of the Services by any other user, host or network, including by
                  means of overloading, &quot;flooding,&quot; &quot;spamming,&quot; &quot;mail bombing&quot;, or
                  &quot;crashing&quot; the Services. Any unauthorized use of the Services terminates the licenses
                  granted by Solana Spaces pursuant to this Agreement. 
                </p>
              </li>
              <li>
                <p>
                  <strong>Third-Party Services.</strong> In most cases, Solana Spaces is compensated by third parties
                  for including their content and Third-Party Links in the Services.
                </p>
                <p>
                  <strong>9.1 Third Party Activities</strong>. Third party services may involve blockchain transactions,
                  digital assets, cryptocurrencies and decentralized finance products and services. There are inherent
                  risks with digital assets and decentralized finance including the fact that tokens are not legal
                  tender and are not backed by any government. Unlike fiat currencies, which are regulated and backed by
                  local governments and central banks, tokens are based only on technology and user consensus, which
                  means that in cases of manipulations or market panic, central governments will not take any corrective
                  actions or measures to achieve stability, maintain liquidity or protect their value. Transactions may
                  be irreversible, and, accordingly, potential losses due to fraudulent or accidental transactions are
                  not recoverable. Some blockchain transactions are deemed to be completed when recorded on a public
                  ledger, which is not necessarily the date or time when you or another party initiated the transaction.
                  The regulatory frameworks applicable to blockchain transactions in connection with tokens are still
                  developing and evolving. It is possible that your transactions or funds are, or may be in the future,
                  subject to various reporting, tax or other liabilities and obligations.  Legislative and regulatory
                  changes or actions at the country or international level may materially and adversely affect the use,
                  transfer, exchange, and value of tokens. 
                </p>
                <p>
                  <strong>9.2 Advice from Third Parties</strong>. Some of the Services involve advice from third parties
                  and third party content. You agree that any such advice and content is provided for information,
                  education, and entertainment purposes only, and does not constitute legal, financial, tax planning,
                  medical, or other advice from Solana Spaces. You agree that Solana Spaces is not liable for any advice
                  provided by third parties. You agree that you are responsible for your own financial research and
                  financial decisions, and that Solana Spaces is not responsible or liable for any decisions or actions
                  you take or authorize third parties to take on your behalf based on information you receive as a user
                  of the Services.
                </p>
                <p>
                  <strong>9.3 Third Party Links</strong>. The Services may contain links to third-party services such as
                  third party websites, applications, or ads (&quot;<strong>Third-Party Links</strong>&quot;). When you
                  click on such a link, we will not necessarily warn you that you have left the Services. Solana Spaces
                  does not control and is not responsible for Third-Party Links. Solana Spaces provides these
                  Third-Party Links only as a convenience and does not review, approve, monitor, endorse, warrant, or
                  make any representations with respect to them, or any content, products or services accessible through
                  such links. Your use of all Third-Party Links is at your own risk.
                </p>
                <p>
                  <strong>9.4 Sharing Information with Third Parties</strong>. To use some of the Services, you may need
                  to provide information such as wallet addresses, credit card numbers, bank account numbers, and other
                  sensitive financial information, to third parties. You agree that your decision to make available any
                  sensitive or confidential information is your sole responsibility and at your sole risk and subject to
                  such third party&#x27;s privacy policy and other third party&#x27;s applicable terms and conditions.
                  Solana Spaces has no control and makes no representations as to the use or disclosure of information
                  provided by you to third parties. You agree that these third-party services are not under Solana
                  Spaces&#x27; control, and that Solana Spaces is not responsible for any third party&#x27;s use of your
                  information.
                </p>
              </li>
              <li>
                <p>
                  <strong>Indemnification.</strong> You agree to indemnify and hold Solana Spaces, its corporate
                  parents, subsidiaries, and affiliates, and the officers, directors, employees, agents,
                  representatives, partners and licensors of each (collectively, the &quot;
                  <strong>Solana Spaces</strong>
                  <strong>Indemnitees</strong>&quot;) harmless from any damages, losses, costs, liabilities and expenses
                  (including reasonable attorneys\&#x27; fees) relating to or arising out of any claims concerning: (a)
                  Your Content; (b) your access to, use of, or alleged use of, the Services; (c) your violation of this
                  Agreement; (d) your violation of any rights of another party, including any Users; (e) your violation
                  of any applicable laws, rules or regulations and/or (f) any disputes or issues between you and any
                  third party. Solana Spaces reserves the right, at its own cost, to assume the exclusive defense and
                  control of any matter otherwise subject to indemnification by you, in which event you will fully
                  cooperate with Solana Spaces in asserting any available defenses. You agree that the provisions in
                  this section will survive any termination of your Account, this Agreement or your access to the
                  Services. 
                </p>
              </li>
              <li>
                <p>
                  <strong>Disclaimer of Warranties and Conditions.</strong> 
                </p>
                <p>
                  <strong>11.1 NO WARRANTIES</strong>. YOU EXPRESSLY UNDERSTAND AND AGREE THAT TO THE FULLEST EXTENT
                  PERMITTED BY APPLICABLE LAW, YOUR USE OF THE SERVICES AND ANY PRODUCTS OFFERED THROUGH THE SERVICES IS
                  AT YOUR SOLE RISK, AND THE SERVICES AND ANY PRODUCTS ARE PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS
                  AVAILABLE&quot; BASIS, WITH ALL FAULTS. TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, THE SOLANA
                  SPACES INDEMNITEES EXPRESSLY DISCLAIM ALL WARRANTIES, REPRESENTATIONS, AND CONDITIONS OF ANY KIND,
                  WHETHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OR CONDITIONS OF
                  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT ARISING FROM THE
                  PRODUCTS AND SERVICES AND ANY WARRANTIES ARISING OUT OF COURSE-OF-DEALING, USAGE OR TRADE. THE SOLANA
                  SPACES INDEMNITEES MAKE NO WARRANTY, REPRESENTATION OR CONDITION THAT: (1) THE SERVICES WILL MEET YOUR
                  REQUIREMENTS; (2) THE INFORMATION, CONTENT, AND DATA ON THE SERVICES ARE ACCURATE, COMPLETE, OR
                  CURRENT; (3) YOUR USE OF THE SERVICES WILL BE UNINTERRUPTED, TIMELY, SECURE OR ERROR-FREE; (4) ANY
                  ERRORS IN THE SERVICES WILL BE CORRECTED; OR (5) YOUR USE OF THE SERVICES WILL NOT EXPOSE YOUR
                  HARDWARE OR NETWORKS TO ADDITIONAL SECURITY RISK.
                </p>
                <p>
                  Descriptions, images, references, features, content, specifications, products, prices, and
                  availability of any Products are subject to change without notice. our current prices can be found on
                  the SERVICES. We make reasonable efforts to accurately display the attributes of our Products,
                  including the applicable colors; however, the actual color you see will depend on your computer
                  system, and we cannot guarantee that your computer will accurately display such colors. The inclusion
                  of any Products on the SERVICES at a particular time does not imply or warrant that these Products
                  will be available at any time.
                </p>
                <p>
                  <strong>11.2 No Guarantee Of Accuracy</strong>. SOLANA SPACES does not guarantee the accuracy of, and
                  disclaims all liability for, any errors or other inaccuracies in the information, content,
                  recommendations, and materials made available through the Services.
                </p>
                <p>
                  <strong>11.3 Services Provided For Informational Purposes</strong>. The information provided through
                  the Services is provided solely for informational, educational, or entertainment purposes. Solana
                  Spaces is not a financial INSTITUTION, TAX, INVESTMENT, FINANCIAL OR LEGAL ADVISOR, or insurance
                  provider. the content and materials available through the Services do not constitute any form of
                  advice, referral or recommendation by SOLANA SPACES, should not be regarded as an offer, solicitation,
                  invitation or recommendation to buy or sell DIGITAL ASSETS or TO USE any THIRD PARTY services and is
                  not intended to be relied upon by you in making any specific decision to buy or sell a DIGITAL
                  ASSET. Nothing included in the site constitutes an offer or solicitation to sell, or distribution of,
                  investments and related services to anyone in any jurisdiction. ALL CONTENT ON THIS WEBSITE IS
                  INFORMATION OF A GENERAL NATURE AND DOES NOT ADDRESS THE CIRUCMSTANCES OF ANY PARTICULAR INDIVIDUAL OR
                  ENTITY. Solana Spaces makes no representations, warranties, or guarantees, express or implied,
                  regarding the results that may be obtained through the use of the Services. SOLANA SPACES recommendS
                  that you seek independent advice from financial, legal and tax advisors before making any FINANCIAL
                  decision, particularly in light of the risks associated with digital assets. SOLANA SPACES IS NOT A
                  FIDUCIARY BY VIRTUE OR ANY PERSON&#x27;S USE OR ACCESS TO THIS WEBSITE OR ANY CONTENT THEREIN.
                </p>
                <p>
                  <strong>11.4 No Warranties Regarding Third Parties</strong>. Solana Spaces makes no representations,
                  warranties, or guarantees, express or implied, regarding any third party service or advice provided by
                  a third party, or any offers provided through the Services. Solana Spaces does not endorse any
                  particular advisor or other third party. Solana Spaces acts solely as an intermediary between you and
                  third party service providers and expressly disclaims any and all liability for any content, products,
                  or services provided by such service providers. See Section 8, above, for more information regarding
                  third parties and third party services.
                </p>
                <p>
                  10.5 CERTAIN STATE LAWS DO NOT ALLOW LIMITATIONS ON IMPLIED WARRANTIES. IF THESE LAWS APPLY TO YOU,
                  SOME OR ALL OF THE FOREGOING DISCLAIMERS, EXCLUSIONS AND LIMITATIONS MAY NOT APPLY TO YOU, AND YOU
                  MIGHT HAVE ADDITIONAL RIGHTS. 
                </p>
              </li>
              <li>
                <p>
                  <strong>Limitation of Liability.</strong> 
                </p>
                <p>
                  <strong>12.1 Disclaimer of Certain Damages.</strong> TO THE FULLEST EXTENT PERMITTED BY APPLICABLE
                  LAW, THE SOLANA SPACES INDEMNITEES SHALL NOT BE LIABLE FOR ANY LOSS OF PROFITS OR REVENUE OR FOR
                  INDIRECT, INCIDENTAL, PUNITIVE, EXEMPLARY, SPECIAL OR CONSEQUENTIAL DAMAGES, OR DAMAGES OR COSTS DUE
                  TO LOSS OF DATA, PRODUCTION, OR USE, BUSINESS INTERRUPTION OR PROCUREMENT OF SUBSTITUTE GOODS OR
                  SERVICES, WHETHER OR NOT SOLANA SPACES HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. 
                </p>
                <p>
                  <strong>12.2 Disclaimer of Third Party Conduct.</strong>
                  YOU SPECIFICALLY ACKNOWLEDGE AND AGREE THAT THE SOLANA SPACES INDEMNITEES ARE NOT LIABLE FOR ANY
                  DEFAMATORY, OFFENSIVE OR ILLEGAL CONDUCT OF ANY THIRD PARTIES ON THE SERVICES, INCLUDING WITHOUT ANY
                  LIMITATION, ANY USERS OF THE SERVICES.
                </p>
                <p>
                  <strong>12.3 Cap on Liability.</strong> IF YOU HAVE PURCHASED ANY PRODUCTS FROM SOLANA SPACES THROUGH
                  THE SERVICES, UNDER NO CIRCUMSTANCES WILL THE TOTAL AGGREGATE AMOUNT THAT THE SOLANA SPACES
                  INDEMNITEES ARE LIABLE TO YOU EXCEED THE LESSER OF (A) THE TOTAL AMOUNT ACTUALLY PAID TO SOLANA SPACES
                  BY YOU DURING THE SIX-MONTH PERIOD PRIOR TO THE ACT, OMISSION OR OCCURRENCE GIVING RISE TO SUCH
                  LIABILITY OR (B) THE REMEDY OR PENALTY IMPOSED BY THE STATUTE OR REGULATION UNDER WHICH SUCH CLAIM
                  ARISES. IF YOU HAVE NOT PURCHASED ANY PRODUCTS FROM SOLANA SPACES THROUGH THE SERVICES, UNDER NO
                  CIRCUMSTANCES WILL THE TOTAL AGGREGATE AMOUNT THAT the SOLANA SPACES INDEMNITEES ARE LIABLE TO YOU
                  EXCEED ONE HUNDRED DOLLARS (\$100).
                </p>
                <p>
                  <strong>12.4 User Content and Settings.</strong> THE SOLANA SPACES INDEMNITEES ASSUME NO
                  RESPONSIBILITY FOR THE TIMELINESS, DELETION, MIS-DELIVERY OR FAILURE TO STORE ANY CONTENT, USER
                  COMMUNICATIONS OR PERSONALIZATION SETTINGS. 
                </p>
                <p>
                  <strong>12.5 Basis of the Bargain.</strong> THE LIMITATIONS OF DAMAGES SET FORTH ABOVE ARE FUNDAMENTAL
                  ELEMENTS OF THE BASIS OF THE BARGAIN BETWEEN SOLANA SPACES AND YOU. 
                </p>
                <p>
                  <strong>12.6 Exclusions.</strong> THE LAWS OF SOME STATES DO NOT ALLOW FOR THE EXCLUSION OR LIMITATION
                  OF CERTAIN DAMAGES. IF THESE LAWS APPLY TO YOU, SOME OR ALL OF THE FOREGOING DISCLAIMERS, EXCLUSIONS
                  AND LIMITATIONS MAY NOT APPLY TO YOU AND YOU MIGHT HAVE OTHER RIGHTS. 
                  <strong>
                    IN ADDITION, THE FOREGOING DISCLAIMER OF PUNITIVE AND EXEMPLARY DAMAGES SHALL NOT APPLY TO USERS WHO
                    RESIDE IN THE STATE OF NEW JERSEY.
                  </strong>
                   
                </p>
                <p>
                  <strong>12.7 Waiver</strong>. You shall and hereby do waive California Civil Code Section 1542 or any
                  other similar law of any jurisdiction, which says in substance: &quot;A general release does not
                  extend to claims which the creditor or releasing party does not know or suspect to exist in his or her
                  favor at the time of executing the release and that, if known by him or her would have materially
                  affected his or her settlement with the debtor or released party.&quot; Some jurisdictions do not
                  allow the exclusion of implied warranties, so the above exclusion may not apply to you. You may have
                  other rights which vary from jurisdiction to jurisdiction.
                </p>
              </li>
              <li>
                <p>
                  <strong>Procedure for Making Claims of Copyright Infringement.</strong> If you believe content posted
                  on the Services infringes your copyright rights, please provide our Copyright Agent with the following
                  information: (1) an electronic or physical signature of the person authorized to act on behalf of the
                  owner of the copyright interest; (2) a description of the copyrighted work that you claim has been
                  infringed; (3) a description of the location on the Services of the material that you claim is
                  infringing; (4) your address, telephone number and e-mail address; (5) a written statement that you
                  have a good faith belief that the disputed use is not authorized by the copyright owner, its agent or
                  the law; and (6) a statement by you, made under penalty of perjury, that the above information in your
                  notice is accurate and that you are the copyright owner or authorized to act on the copyright
                  owner\&#x27;s behalf. Correspondence to our Copyright Agent regarding notice of claims of copyright
                  infringement should be addressed to: Solana Spaces, 548 Market Street, PMB 45477, San Francisco, CA
                  94104, Attn: General Counsel.
                </p>
              </li>
              <li>
                <p>
                  <strong>Termination.</strong>  At its sole discretion, Solana Spaces may modify or discontinue the
                  Services, or may modify, suspend or terminate your access to the Services, for any reason, with or
                  without notice to you and without liability to you or any third party. In addition to suspending or
                  terminating your access to the Services, Solana Spaces reserves the right to take appropriate legal
                  action, including without limitation pursuing civil, criminal or injunctive redress. Even after your
                  right to use the Services is terminated, this Agreement will remain enforceable against you and unpaid
                  amounts you owe to Solana Spaces for Products purchased will remain due. Upon termination of this
                  Agreement, all provisions which by their nature are intended to survive termination will survive,
                  including without limitation, Sections 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 and 17.
                </p>
              </li>
              <li>
                <p>
                  <strong>International Users.</strong> The Services are controlled and offered by Solana Spaces from
                  its facilities in the United States of America. Solana Spaces makes no representations that the
                  Services are appropriate or available for use in other locations. Those who access or use the Services
                  from other countries do so at their own volition and are responsible for compliance with local law.
                </p>
              </li>
              <li>
                <p>
                  <strong>
                    Dispute Resolution<em>.</em>
                  </strong>
                  <strong>
                    <em>
                      Please read the following arbitration agreement in this Section (&quot;Arbitration
                      Agreement&quot;) carefully.  It requires you to arbitrate disputes with Solana Spaces, its parent
                      companies, subsidiaries, affiliates, successors and assigns and all of their respective officers,
                      directors, employees, agents, and representatives (collectively, the &quot;Solana Spaces
                      Parties&quot;) and limits the manner in which you can seek relief from the Solana Spaces Parties
                    </em>
                    .
                  </strong>
                   
                </p>
                <p>
                  <strong>16.1 Applicability of Arbitration Agreement.</strong> You agree that any dispute between you
                  and any of the Solana Spaces Parties relating in any way to the Services, the Products, or this
                  Agreement, will be resolved by binding arbitration, rather than in court, except that (1) you and the
                  Solana Spaces Parties may assert individualized claims in small claims court if the claims qualify,
                  remain in such court and advance solely on an individual, non-class basis; and (2) you or the Solana
                  Spaces Parties may seek equitable relief in court for infringement or other misuse of intellectual
                  property rights (such as trademarks, trade dress, domain names, trade secrets, copyrights, and
                  patents). 
                  <strong>
                    This Arbitration Agreement shall survive the expiration or termination of this Agreement and shall
                    apply, without limitation, to all claims that arose or were asserted before the Effective Date of
                    this Agreement or any prior version of this Agreement. 
                  </strong>
                  This Arbitration Agreement does not preclude you from bringing issues to the attention of federal,
                  state or local agencies. Such agencies can, if the law allows, seek relief against the Solana Spaces
                  Parties on your behalf. For purposes of this Arbitration Agreement, &quot;<strong>Dispute</strong>
                  &quot; will also include disputes that arose or involve facts occurring before the existence of this
                  or any prior versions of the Agreement as well as claims that may arise after the termination of this
                  Agreement.
                </p>
                <p>
                  <strong>16.2 Informal Dispute Resolution.</strong> There might be instances when a Dispute arises
                  between you and Solana Spaces. If that occurs, Solana Spaces is committed to working with you to reach
                  a reasonable resolution. You and Solana Spaces agree that good faith informal efforts to resolve
                  Disputes can result in a prompt, low‐cost and mutually beneficial outcome. You and Solana Spaces
                  therefore agree that before either party commences arbitration against the other (or initiates an
                  action in small claims court if a party so elects), we will personally meet and confer telephonically
                  or via videoconference, in a good faith effort to resolve informally any Dispute covered by this
                  Arbitration Agreement (&quot;<strong>Informal Dispute Resolution Conference</strong>&quot;). If you
                  are represented by counsel, your counsel may participate in the conference, but you will also
                  participate in the conference.
                </p>
                <p>
                  The party initiating a Dispute must give notice to the other party in writing of its intent to
                  initiate an Informal Dispute Resolution Conference (&quot;<strong>Notice</strong>&quot;), which shall
                  occur within 45 days after the other party receives such Notice, unless an extension is mutually
                  agreed upon by the parties. Notice to Solana Spaces that you intend to initiate an Informal Dispute
                  Resolution Conference should be sent by email to:
                  <a href="mailto:legal@solanaspaces.com">legal@solanaspaces.com</a>
                  or by regular mail to our offices located at Solana Spaces, 548 Market Street, PMB 45477, San
                  Francisco, CA 94104, Attn: General Counsel. The Notice must include: (1) your name, telephone number,
                  mailing address, e‐mail address associated with your account (if you have one); (2) the name,
                  telephone number, mailing address and e‐mail address of your counsel, if any; and (3) a description of
                  your Dispute.
                </p>
                <p>
                  The Informal Dispute Resolution Conference shall be individualized such that a separate conference
                  must be held each time either party initiates a Dispute, even if the same law firm or group of law
                  firms represents multiple users in similar cases, unless all parties agree; multiple individuals
                  initiating a Dispute cannot participate in the same Informal Dispute Resolution Conference unless all
                  parties agree. In the time between a party receiving the Notice and the Informal Dispute Resolution
                  Conference, nothing in this Arbitration Agreement shall prohibit the parties from engaging in informal
                  communications to resolve the initiating party&#x27;s Dispute. Engaging in the Informal Dispute
                  Resolution Conference is a condition precedent and requirement that must be fulfilled before
                  commencing arbitration. The statute of limitations and any filing fee deadlines shall be tolled while
                  the parties engage in the Informal Dispute Resolution Conference process required by this section.
                </p>
                <p>
                  <strong>16.3 Arbitration Rules and Forum.</strong> This Agreement evidences a transaction involving
                  interstate commerce; and notwithstanding any other provision herein with respect to the applicable
                  substantive law, the Federal Arbitration Act, 9 U.S.C. § 1 et seq., will govern the interpretation and
                  enforcement of this Arbitration Agreement and any arbitration proceedings. If the Informal Dispute
                  Resolution Process described above does not resolve satisfactorily within sixty (60) days after
                  receipt of your Notice, you and Solana Spaces agree that either party shall have the right to finally
                  resolve the Dispute through binding arbitration. The Federal Arbitration Act governs the
                  interpretation and enforcement of this Arbitration Agreement. The arbitration will be conducted by
                  JAMS, an established alternative dispute resolution provider. Disputes involving claims and
                  counterclaims with an amount in controversy under \$250,000, not inclusive of attorneys&#x27; fees and
                  interest, shall be subject to JAMS&#x27; most current version of the Streamlined Arbitration Rules and
                  procedures available at 
                  <a href="http://www.jamsadr.com/rules-streamlined-arbitration/">
                    http://www.jamsadr.com/rules-streamlined-arbitration/
                  </a>
                  ; all other claims shall be subject to JAMS&#x27;s most current version of the Comprehensive
                  Arbitration Rules and Procedures, available at 
                  <a href="http://www.jamsadr.com/rules-comprehensive-arbitration/">
                    http://www.jamsadr.com/rules-comprehensive-arbitration/
                  </a>
                  . JAMS&#x27;s rules are also available at <a href="http://www.jamsadr.com/">www.jamsadr.com</a>
                  or by calling JAMS at 800-352-5267. A party who wishes to initiate arbitration must provide the other
                  party with a request for arbitration (the &quot;<strong>Request</strong>&quot;). The Request must
                  include: (1) the name, telephone number, mailing address, e‐mail address of the party seeking
                  arbitration and the account username (if applicable) as well as the email address associated with any
                  applicable account; (2) a statement of the legal claims being asserted and the factual bases of those
                  claims; (3) a description of the remedy sought and an accurate, good‐faith calculation of the amount
                  in controversy in United States Dollars; (4) a statement certifying completion of the Informal Dispute
                  Resolution process as described above; and (5) evidence that the requesting party has paid any
                  necessary filing fees in connection with such arbitration. \ \ If the party requesting arbitration is
                  represented by counsel, the Request shall also include counsel&#x27;s name, telephone number, mailing
                  address, and email address. Such counsel must also sign the Request. By signing the Request, counsel
                  certifies to the best of counsel&#x27;s knowledge, information, and belief, formed after an inquiry
                  reasonable under the circumstances, that: (1) the Request is not being presented for any improper
                  purpose, such as to harass, cause unnecessary delay, or needlessly increase the cost of dispute
                  resolution; (2) the claims, defenses and other legal contentions are warranted by existing law or by a
                  nonfrivolous argument for extending, modifying, or reversing existing law or for establishing new law;
                  and (3) the factual and damages contentions have evidentiary support or, if specifically so
                  identified, will likely have evidentiary support after a reasonable opportunity for further
                  investigation or discovery.
                </p>
                <p>
                  Unless you and Solana Spaces otherwise agree, or the Batch Arbitration process discussed in Subsection
                  16.8 is triggered, the arbitration will be conducted in the county where you reside. Subject to the
                  JAMS Rules, the arbitrator may direct a limited and reasonable exchange of information between the
                  parties, consistent with the expedited nature of the arbitration. If the JAMS is not available to
                  arbitrate, the parties will select an alternative arbitral forum. Your responsibility to pay any JAMS
                  fees and costs will be solely as set forth in the applicable JAMS Rules.
                </p>
                <p>
                  You and Solana Spaces agree that all materials and documents exchanged during the arbitration
                  proceedings shall be kept confidential and shall not be shared with anyone except the parties&#x27;
                  attorneys, accountants, or business advisors, and then subject to the condition that they agree to
                  keep all materials and documents exchanged during the arbitration proceedings confidential.
                </p>
                <p>
                  <strong>16.4 Authority of Arbitrator.</strong> The arbitrator shall have exclusive authority to
                  resolve all disputes subject to arbitration hereunder including, without limitation, any dispute
                  related to the interpretation, applicability, enforceability or formation of this Arbitration
                  Agreement or any portion of the Arbitration Agreement, except for the following: (1) all Disputes
                  arising out of or relating to the subsection entitled &quot;Waiver of Class and Other
                  Non-Individualized Relief,&quot; including any claim that all or part of the subsection entitled
                  &quot;Waiver of Class and Other Non-Individualized Relief&quot; is unenforceable, illegal, void or
                  voidable, or that such subsection entitled &quot;Waiver of Class and Other Non-Individualized
                  Relief&quot; has been breached, shall be decided by a court of competent jurisdiction and not by an
                  arbitrator; (2) except as expressly contemplated in the subsection entitled &quot;Batch
                  Arbitration,&quot; all Disputes about the payment of arbitration fees shall be decided only by a court
                  of competent jurisdiction and not by an arbitrator; (3) all Disputes about whether either party has
                  satisfied any condition precedent to arbitration shall be decided only by a court of competent
                  jurisdiction and not by an arbitrator; and (4) all Disputes about which version of the Arbitration
                  Agreement applies shall be decided only by a court of competent jurisdiction and not by an arbitrator.
                  The arbitration proceeding will not be consolidated with any other matters or joined with any other
                  cases or parties, except as expressly provided in the subsection entitled &quot;Batch
                  Arbitration.&quot; The arbitrator shall have the authority to grant motions dispositive of all or part
                  of any claim or dispute. The arbitrator shall have the authority to award monetary damages and to
                  grant any non-monetary remedy or relief available to an individual party under applicable law, the
                  arbitral forum&#x27;s rules, and this Agreement (including the Arbitration Agreement). The arbitrator
                  shall issue a written award and statement of decision describing the essential findings and
                  conclusions on which any award (or decision not to render an award) is based, including the
                  calculation of any damages awarded. The arbitrator shall follow the applicable law. The award of the
                  arbitrator is final and binding upon you and us. Judgment on the arbitration award may be entered in
                  any court having jurisdiction.
                </p>
                <p>
                  <strong>16.5 Waiver of Jury Trial.</strong> EXCEPT AS SPECIFIED in section 16.1, YOU AND THE SOLANA
                  SPACES PARTIES HEREBY WAIVE ANY CONSTITUTIONAL AND STATUTORY RIGHTS TO SUE IN COURT AND HAVE A TRIAL
                  IN FRONT OF A JUDGE OR A JURY. You and the Solana Spaces Parties are instead electing that all covered
                  claims and disputes shall be resolved exclusively by arbitration under this Arbitration Agreement,
                  except as specified in Section 16.1 above. An arbitrator can award on an individual basis the same
                  damages and relief as a court and must follow this Agreement as a court would. However, there is no
                  judge or jury in arbitration, and court review of an arbitration award is subject to very limited
                  review. 
                </p>
                <p>
                  <strong>16.6 Waiver of Class or Other Non-Individualized Relief.</strong>  YOU AND SOLANA SPACES AGREE
                  THAT, EXCEPT AS SPECIFIED IN SUBSECTION 16.8, EACH OF US MAY BRING CLAIMS AGAINST THE OTHER ONLY ON AN
                  INDIVIDUAL BASIS AND NOT ON A CLASS, REPRESENTATIVE, OR COLLECTIVE BASIS, AND THE PARTIES HEREBY WAIVE
                  ALL RIGHTS TO HAVE ANY DISPUTE BE BROUGHT, HEARD, ADMINISTERED, RESOLVED, OR ARBITRATED ON A CLASS,
                  COLLECTIVE, REPRESENTATIVE, OR MASS ACTION BASIS. ONLY INDIVIDUAL RELIEF IS AVAILABLE, AND DISPUTES OF
                  MORE THAN ONE CUSTOMER OR USER CANNOT BE ARBITRATED OR CONSOLIDATED WITH THOSE OF ANY OTHER CUSTOMER
                  OR USER. Subject to this Arbitration Agreement, the arbitrator may award declaratory or injunctive
                  relief only in favor of the individual party seeking relief and only to the extent necessary to
                  provide relief warranted by the party&#x27;s individual claim. Nothing in this paragraph is intended
                  to, nor shall it, affect the terms and conditions under the Subsection 16.8 entitled &quot;Batch
                  Arbitration.&quot; Notwithstanding anything to the contrary in this Arbitration Agreement, if a court
                  decides by means of a final decision, not subject to any further appeal or recourse, that the
                  limitations of this subsection, &quot;Waiver of Class and Other Non-Individualized Relief,&quot; are
                  invalid or unenforceable as to a particular claim or request for relief (such as a request for public
                  injunctive relief), you and Solana Spaces agree that that particular claim or request for relief (and
                  only that particular claim or request for relief) shall be severed from the arbitration and may be
                  litigated in the state or federal courts located in the State of California. All other Disputes shall
                  be arbitrated or litigated in small claims court. This subsection does not prevent you or Solana
                  Spaces from participating in a class-wide settlement of claims.
                </p>
                <p>
                  <strong>16.7 Attorneys&#x27; Fees and Costs.</strong> The parties shall bear their own attorneys&#x27;
                  fees and costs in arbitration unless the arbitrator finds that either the substance of the Dispute or
                  the relief sought in the Request was frivolous or was brought for an improper purpose (as measured by
                  the standards set forth in Federal Rule of Civil Procedure 11(b)). If you or Solana Spaces need to
                  invoke the authority of a court of competent jurisdiction to compel arbitration, then the party that
                  obtains an order compelling arbitration in such action shall have the right to collect from the other
                  party its reasonable costs, necessary disbursements, and reasonable attorneys&#x27; fees incurred in
                  securing an order compelling arbitration. The prevailing party in any court action relating to whether
                  either party has satisfied any condition precedent to arbitration, including the Informal Dispute
                  Resolution Process, is entitled to recover their reasonable costs, necessary disbursements, and
                  reasonable attorneys&#x27; fees and costs.
                </p>
                <p>
                  <strong>16.8 Batch Arbitration.</strong> To increase the efficiency of administration and resolution
                  of arbitrations, you and Solana Spaces agree that in the event that there are one hundred (100) or
                  more individual Requests of a substantially similar nature filed against Solana Spaces by or with the
                  assistance of the same law firm, group of law firms, or organizations, within a thirty (30) day period
                  (or as soon as possible thereafter), the JAMS shall (1) administer the arbitration demands in batches
                  of 100 Requests per batch (plus, to the extent there are less than 100 Requests left over after the
                  batching described above, a final batch consisting of the remaining Requests); (2) appoint one
                  arbitrator for each batch; and (3) provide for the resolution of each batch as a single consolidated
                  arbitration with one set of filing and administrative fees due per side per batch, one procedural
                  calendar, one hearing (if any) in a place to be determined by the arbitrator, and one final award
                  (&quot;<strong>Batch Arbitration</strong>&quot;).
                </p>
                <p>
                  All parties agree that Requests are of a &quot;substantially similar nature&quot; if they arise out of
                  or relate to the same event or factual scenario and raise the same or similar legal issues and seek
                  the same or similar relief. To the extent the parties disagree on the application of the Batch
                  Arbitration process, the disagreeing party shall advise the JAMS, and the JAMS shall appoint a sole
                  standing arbitrator to determine the applicability of the Batch Arbitration process (&quot;
                  <strong>Administrative Arbitrator</strong>&quot;). In an effort to expedite resolution of any such
                  dispute by the Administrative Arbitrator, the parties agree the Administrative Arbitrator may set
                  forth such procedures as are necessary to resolve any disputes promptly. The Administrative
                  Arbitrator&#x27;s fees shall be paid by Solana Spaces.
                </p>
                <p>
                  You and Solana Spaces agree to cooperate in good faith with the JAMS to implement the Batch
                  Arbitration process including the payment of single filing and administrative fees for batches of
                  Requests, as well as any steps to minimize the time and costs of arbitration, which may include: (1)
                  the appointment of a discovery special master to assist the arbitrator in the resolution of discovery
                  disputes; and (2) the adoption of an expedited calendar of the arbitration proceedings.
                </p>
                <p>
                  This Batch Arbitration provision shall in no way be interpreted as authorizing a class, collective
                  and/or mass arbitration or action of any kind, or arbitration involving joint or consolidated claims
                  under any circumstances, except as expressly set forth in this provision.
                </p>
                <p>
                  <strong>16.9 30-Day Right to Opt Out.</strong>  You have the right to opt out of the provisions of
                  this Arbitration Agreement by sending a timely written notice of your decision to opt out to the
                  following address: Solana Spaces, 548 Market Street, PMB 45477, San Francisco, CA 94104,, Attn:
                  General Counsel or email to legal\@solanaspaces.com, within 30 days after first becoming subject to
                  this Arbitration Agreement. Your notice must include your name and address and a clear statement that
                  you want to opt out of this Arbitration Agreement. If you opt out of this Arbitration Agreement, all
                  other parts of this Agreement will continue to apply to you. Opting out of this Arbitration Agreement
                  has no effect on any other arbitration agreements that you may currently have with us, or may enter
                  into in the future with us. 
                </p>
                <p>
                  16.10 <strong>Invalidity, Expiration.</strong> Except as provided in the subsection entitled
                  &quot;Waiver of Class or Other Non-Individualized Relief&quot;, if any part or parts of this
                  Arbitration Agreement are found under the law to be invalid or unenforceable, then such specific part
                  or parts shall be of no force and effect and shall be severed and the remainder of the Arbitration
                  Agreement shall continue in full force and effect. You further agree that any Dispute that you have
                  with Solana Spaces as detailed in this Arbitration Agreement must be initiated via arbitration within
                  the applicable statute of limitation for that claim or controversy, or it will be forever time barred.
                  Likewise, you agree that all applicable statutes of limitation will apply to such arbitration in the
                  same manner as those statutes of limitation would apply in the applicable court of competent
                  jurisdiction.
                </p>
                <p>
                  16.11 <strong>Modification.</strong> Notwithstanding any provision in this Agreement to the contrary,
                  we agree that if Solana Spaces makes any future material change to this Arbitration Agreement, you may
                  reject that change within thirty (30) days of such change becoming effective by writing Solana Spaces
                  at the following address: Solana Spaces, 548 Market Street, PMB 45477, San Francisco, CA 94104, Attn:
                  General Counsel. Unless you reject the change within thirty (30) days of such change become effective
                  by writing to Solana Spaces in accordance with the foregoing, your continued use of the Website and/or
                  Services, including the acceptance of products and services offered on the Website following the
                  posting of changes to this Arbitration Agreement constitutes your acceptance of any such changes.
                  Changes to this Arbitration Agreement do not provide you with a new opportunity to opt out of the
                  Arbitration Agreement if you have previously agreed to a version of this Agreement and did not validly
                  opt out of arbitration. If you reject any change or update to this Arbitration Agreement, and you were
                  bound by an existing agreement to arbitrate Disputes arising out of or relating in any way to your
                  access to or use of the Services or of the Website, any communications you receive, any products sold
                  or distributed through the Website, the Services, or this Agreement, the provisions of this
                  Arbitration Agreement as of the date you first accepted this Agreement (or accepted any subsequent
                  changes to this Agreement) remain in full force and effect. Solana Spaces will continue to honor any
                  valid opt outs of the Arbitration Agreement that you made to a prior version of this Agreement.
                </p>
              </li>
              <li>
                <p>
                  <strong>General Provisions.</strong> 
                </p>
                <p>
                  <strong>17.1 Electronic Communications.</strong> The communications between you and Solana Spaces use
                  electronic means, whether you visit the Services or send Solana Spaces e-mails, or whether Solana
                  Spaces posts notices on the Services or communicates with you via e-mail. For contractual purposes,
                  you (1) consent to receive communications from Solana Spaces in an electronic form; and (2) agree that
                  all terms and conditions, agreements, notices, disclosures, and other communications and documents
                  that Solana Spaces provides to you electronically will have the same legal effect that such
                  communications or documents would have if they were set forth in &quot;writing.&quot; The foregoing
                  sentence does not affect your statutory rights. 
                </p>
                <p>
                  <strong>17.2 Assignment.</strong> This Agreement, and your rights and obligations hereunder, may not
                  be assigned, subcontracted, delegated or otherwise transferred by you without Solana Spaces&#x27;s
                  prior written consent, and any attempted assignment, subcontract, delegation, or transfer in violation
                  of the foregoing will be null and void. 
                </p>
                <p>
                  <strong>17.3 Force Majeure.</strong> Solana Spaces shall not be liable for any delay or failure to
                  perform resulting from causes outside its reasonable control, including, but not limited to, acts of
                  God, war, terrorism, riots, embargos, acts of civil or military authorities, fire, floods, accidents,
                  strikes or shortages of transportation facilities, fuel, energy, labor or materials. 
                </p>
                <p>
                  <strong>17.4 Questions, Complaints, Claims.</strong> If you have any questions, complaints or claims
                  with respect to the Services, please contact our customer service department using the contact
                  information available on the Services. We will do our best to address your concerns. 
                </p>
                <p>
                  <strong>17.5 Exclusive Venue.</strong> To the extent the parties are permitted under this Agreement to
                  initiate litigation in a court, both you and Solana Spaces agree that all claims and disputes arising
                  out of or relating to this Agreement that are not brought in a small claims court pursuant to Section
                  16.1 will be litigated exclusively in the state courts in San Francisco County, California or federal
                  courts located in the Northern District of California. 
                </p>
                <p>
                  <strong>17.6 Governing Law.</strong>  THIS AGREEMENT AND ANY ACTION RELATED THERETO WILL BE GOVERNED
                  AND INTERPRETED BY AND UNDER THE LAWS OF THE STATE OF CALIFORNIA, CONSISTENT WITH THE FEDERAL
                  ARBITRATION ACT, WITHOUT GIVING EFFECT TO ANY CONFLICT OF LAW OR OTHER PRINCIPLES THAT PROVIDE FOR THE
                  APPLICATION OF THE LAW OF ANOTHER JURISDICTION. THE UNITED NATIONS CONVENTION ON CONTRACTS FOR THE
                  INTERNATIONAL SALE OF GOODS DOES NOT APPLY TO THIS AGREEMENT. 
                </p>
                <p>
                  <strong>17.7 Notice.</strong> Where Solana Spaces requires that you provide an e-mail address, you are
                  responsible for providing Solana Spaces with your most current e-mail address. In the event that the
                  last e-mail address you provided to Solana Spaces is not valid, or for any reason is not capable of
                  delivering to you any notices required/permitted by this Agreement, Solana Space&#x27;s dispatch of
                  the e-mail containing such notice will nonetheless constitute effective notice. You may give notice to
                  Solana Spaces at the following address: Solana Spaces, 548 Market Street, PMB 45477, San Francisco, CA
                  94104, Attn: General Counsel. Such notice shall be deemed given when received by Solana Spaces by
                  letter delivered by nationally recognized overnight delivery service or first-class postage prepaid
                  mail at the above address. 
                </p>
                <p>
                  <strong>17.8 Waiver.</strong>  Any waiver or failure to enforce any provision of this Agreement on one
                  occasion will not be deemed a waiver of any other provision or of such provision on any other
                  occasion. 
                </p>
                <p>
                  <strong>17.9 Severability.</strong>  Subject to Section 16.5, if any portion of this Agreement is held
                  invalid or unenforceable, that portion shall be construed in a manner to reflect, as nearly as
                  possible, the original intention of the parties, and the remaining portions shall remain in full force
                  and effect. 
                </p>
                <p>
                  17.10 <strong>Export Control.</strong> You may not use, export, import, or transfer the Services
                  except as authorized by U.S. law, the laws of the jurisdiction in which you obtained the Services, and
                  any other applicable laws. In particular, but without limitation, the Services may not be exported or
                  re-exported (a) into any United States embargoed countries, or (b) to anyone on the U.S. Treasury
                  Department\&#x27;s list of Specially Designated Nationals or the U.S. Department of Commerce\&#x27;s
                  Denied Person\&#x27;s List or Entity List. By using the Services, you represent and warrant that (i)
                  you are not located in a country that is subject to a U.S. Government embargo, or that has been
                  designated by the U.S. Government as a &quot;terrorist supporting&quot; country and (ii) you are not
                  listed on any U.S. Government list of prohibited or restricted parties. You also will not use the
                  Services for any purpose prohibited by U.S. law. 
                </p>
                <p>
                  17.11 <strong>Consumer Complaints.</strong> In accordance with California Civil Code §1789.3, you may
                  report complaints to the Complaint Assistance Unit of the Division of Consumer Services of the
                  California Department of Consumer Affairs by contacting them in writing at 400 R Street, Sacramento,
                  CA 95814, or by telephone at (800) 952-5210. 
                </p>
                <p>
                  17.12 <strong>Entire Agreement.</strong> This Agreement is the final, complete and exclusive agreement
                  of the parties with respect to the subject matter hereof and supersedes and merges all prior
                  discussions between the parties with respect to such subject matter.
                </p>
              </li>
            </ol>
          </div>
        </div>

        <div className={s.accept_container}>
          <form onSubmit={handleSubmit}>
            <div className={s.input_container}>
              <input
                className={s.checkbox}
                name="accept"
                id="accept"
                type="checkbox"
                checked={legalChecked}
                onChange={handleChecked}
              />
              <label htmlFor="accept">I have read, understand and agree with all of the terms and conditions.</label>
            </div>
            <button disabled={!legalChecked} className={classNames(!legalChecked && s.disabled, s.button)}>
              OK
            </button>
          </form>
        </div>
      </div>
    </Modal>
  );
};
