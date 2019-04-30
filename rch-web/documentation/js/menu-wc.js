'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">rch-web documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="dependencies.html" data-type="chapter-link">
                                <span class="icon ion-ios-list"></span>Dependencies
                            </a>
                        </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse" ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AttractionsModule.html" data-type="entity-link">AttractionsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AttractionsModule-cf39429954db705688cafccee9209603"' : 'data-target="#xs-components-links-module-AttractionsModule-cf39429954db705688cafccee9209603"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AttractionsModule-cf39429954db705688cafccee9209603"' :
                                            'id="xs-components-links-module-AttractionsModule-cf39429954db705688cafccee9209603"' }>
                                            <li class="link">
                                                <a href="components/BahuichivoComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BahuichivoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BarrancasCobreComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BarrancasCobreComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ChepexploraComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ChepexploraComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ChihuahuaComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ChihuahuaComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CreelComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CreelComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CuauhtemocComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CuauhtemocComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DestinationsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DestinationsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DetailsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DetailsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ElFuerteComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ElFuerteComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LosMochisComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LosMochisComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NativeCommunitiesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NativeCommunitiesComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AttractionsRoutingModule.html" data-type="entity-link">AttractionsRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/BillConfirmComponent.html" data-type="entity-link">BillConfirmComponent</a>
                            </li>
                            <li class="link">
                                <a href="modules/BillFiscalComponent.html" data-type="entity-link">BillFiscalComponent</a>
                            </li>
                            <li class="link">
                                <a href="modules/BillRequestComponent.html" data-type="entity-link">BillRequestComponent</a>
                            </li>
                            <li class="link">
                                <a href="modules/BillSearchComponent.html" data-type="entity-link">BillSearchComponent</a>
                            </li>
                            <li class="link">
                                <a href="modules/GuideModule.html" data-type="entity-link">GuideModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-GuideModule-6513f9890a2048ab99e7f62edd2d77f0"' : 'data-target="#xs-components-links-module-GuideModule-6513f9890a2048ab99e7f62edd2d77f0"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-GuideModule-6513f9890a2048ab99e7f62edd2d77f0"' :
                                            'id="xs-components-links-module-GuideModule-6513f9890a2048ab99e7f62edd2d77f0"' }>
                                            <li class="link">
                                                <a href="components/AirlinesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AirlinesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HotelsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HotelsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ScheduleComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ScheduleComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ScheduleRegionalComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ScheduleRegionalComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TestimonialsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TestimonialsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/GuideRoutingModule.html" data-type="entity-link">GuideRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/RchModule.html" data-type="entity-link">RchModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-RchModule-04726cfeea9e106d137cc1df06db36d0"' : 'data-target="#xs-components-links-module-RchModule-04726cfeea9e106d137cc1df06db36d0"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-RchModule-04726cfeea9e106d137cc1df06db36d0"' :
                                            'id="xs-components-links-module-RchModule-04726cfeea9e106d137cc1df06db36d0"' }>
                                            <li class="link">
                                                <a href="components/CommitComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CommitComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ConfirmComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ConfirmComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CostBoxComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CostBoxComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MainComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MainComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ReceiptComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ReceiptComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/RchRoutingModule.html" data-type="entity-link">RchRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/Step1Component.html" data-type="entity-link">Step1Component</a>
                            </li>
                            <li class="link">
                                <a href="modules/TrainsModule.html" data-type="entity-link">TrainsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-TrainsModule-94d14213022e7209bd0f16926e589275"' : 'data-target="#xs-components-links-module-TrainsModule-94d14213022e7209bd0f16926e589275"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TrainsModule-94d14213022e7209bd0f16926e589275"' :
                                            'id="xs-components-links-module-TrainsModule-94d14213022e7209bd0f16926e589275"' }>
                                            <li class="link">
                                                <a href="components/ChepeExpressComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ChepeExpressComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ChepeRegionalComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ChepeRegionalComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GalleryComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">GalleryComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TrainsRoutingModule.html" data-type="entity-link">TrainsRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#components-links"' :
                            'data-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/AirlinesComponent.html" data-type="entity-link">AirlinesComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/BahuichivoComponent.html" data-type="entity-link">BahuichivoComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/BillConfirmComponent.html" data-type="entity-link">BillConfirmComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/BillFiscalComponent.html" data-type="entity-link">BillFiscalComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/BillRequestComponent.html" data-type="entity-link">BillRequestComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/BillSearchComponent.html" data-type="entity-link">BillSearchComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ChepeExpressComponent.html" data-type="entity-link">ChepeExpressComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ChepeRegionalComponent.html" data-type="entity-link">ChepeRegionalComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ContactComponent.html" data-type="entity-link">ContactComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FaqComponent.html" data-type="entity-link">FaqComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FooterComponent.html" data-type="entity-link">FooterComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/GalleryComponent.html" data-type="entity-link">GalleryComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/HeaderComponent.html" data-type="entity-link">HeaderComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/HistoryComponent.html" data-type="entity-link">HistoryComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/HotelsComponent.html" data-type="entity-link">HotelsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/IndexComponent.html" data-type="entity-link">IndexComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LegalAdviceComponent.html" data-type="entity-link">LegalAdviceComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LegalExpressComponent.html" data-type="entity-link">LegalExpressComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LegalRegionalComponent.html" data-type="entity-link">LegalRegionalComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PaymentComponent.html" data-type="entity-link">PaymentComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ScheduleComponent.html" data-type="entity-link">ScheduleComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ScheduleRegionalComponent.html" data-type="entity-link">ScheduleRegionalComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/StatusComponent.html" data-type="entity-link">StatusComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/Step1Component.html" data-type="entity-link">Step1Component</a>
                            </li>
                            <li class="link">
                                <a href="components/Step3Component.html" data-type="entity-link">Step3Component</a>
                            </li>
                            <li class="link">
                                <a href="components/Step4Component.html" data-type="entity-link">Step4Component</a>
                            </li>
                            <li class="link">
                                <a href="components/Step5Component.html" data-type="entity-link">Step5Component</a>
                            </li>
                            <li class="link">
                                <a href="components/TacComponent.html" data-type="entity-link">TacComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TacExpressComponent.html" data-type="entity-link">TacExpressComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TestimonialsComponent.html" data-type="entity-link">TestimonialsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TimesFaresComponent.html" data-type="entity-link">TimesFaresComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/UrikeComponent.html" data-type="entity-link">UrikeComponent</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});