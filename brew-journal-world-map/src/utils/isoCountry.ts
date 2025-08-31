export const ISO3_TO_NAME: Record<string,string> = {
  AFG:'Afghanistan', ALB:'Albania', DZA:'Algeria', AND:'Andorra', AGO:'Angola', ARG:'Argentina', ARM:'Armenia',
  AUS:'Australia', AUT:'Austria', AZE:'Azerbaijan', BHS:'Bahamas', BHR:'Bahrain', BGD:'Bangladesh', BRB:'Barbados',
  BLR:'Belarus', BEL:'Belgium', BLZ:'Belize', BEN:'Benin', BTN:'Bhutan', BOL:'Bolivia', BIH:'Bosnia and Herzegovina',
  BWA:'Botswana', BRA:'Brazil', BRN:'Brunei', BGR:'Bulgaria', BFA:'Burkina Faso', BDI:'Burundi', KHM:'Cambodia',
  CMR:'Cameroon', CAN:'Canada', CAF:'Central African Republic', TCD:'Chad', CHL:'Chile', CHN:'China', COL:'Colombia',
  COD:'Congo (Kinshasa)', COG:'Congo (Brazzaville)', CRI:'Costa Rica', CIV:'Côte d’Ivoire', HRV:'Croatia', CUB:'Cuba',
  CYP:'Cyprus', CZE:'Czechia', DNK:'Denmark', DJI:'Djibouti', DOM:'Dominican Republic', ECU:'Ecuador', EGY:'Egypt',
  SLV:'El Salvador', GNQ:'Equatorial Guinea', ERI:'Eritrea', EST:'Estonia', SWZ:'Eswatini', ETH:'Ethiopia',
  FIN:'Finland', FRA:'France', GAB:'Gabon', GMB:'Gambia', GEO:'Georgia', DEU:'Germany', GHA:'Ghana',
  GRC:'Greece', GTM:'Guatemala', GIN:'Guinea', GUY:'Guyana', HTI:'Haiti', HND:'Honduras', HUN:'Hungary',
  ISL:'Iceland', IND:'India', IDN:'Indonesia', IRN:'Iran', IRQ:'Iraq', IRL:'Ireland', ISR:'Israel', ITA:'Italy',
  JAM:'Jamaica', JPN:'Japan', JOR:'Jordan', KAZ:'Kazakhstan', KEN:'Kenya', KWT:'Kuwait', KGZ:'Kyrgyzstan',
  LAO:'Laos', LVA:'Latvia', LBN:'Lebanon', LSO:'Lesotho', LBR:'Liberia', LBY:'Libya', LTU:'Lithuania', LUX:'Luxembourg',
  MDG:'Madagascar', MWI:'Malawi', MYS:'Malaysia', MDV:'Maldives', MLI:'Mali', MLT:'Malta', MEX:'Mexico',
  MNG:'Mongolia', MNE:'Montenegro', MAR:'Morocco', MOZ:'Mozambique', MMR:'Myanmar', NAM:'Namibia', NPL:'Nepal',
  NLD:'Netherlands', NZL:'New Zealand', NIC:'Nicaragua', NER:'Niger', NGA:'Nigeria', PRK:'North Korea',
  MKD:'North Macedonia', NOR:'Norway', OMN:'Oman', PAK:'Pakistan', PAN:'Panama', PRY:'Paraguay', PER:'Peru',
  PHL:'Philippines', POL:'Poland', PRT:'Portugal', QAT:'Qatar', ROU:'Romania', RUS:'Russia', RWA:'Rwanda',
  SAU:'Saudi Arabia', SEN:'Senegal', SRB:'Serbia', SLE:'Sierra Leone', SGP:'Singapore', SVK:'Slovakia',
  SVN:'Slovenia', SOM:'Somalia', ZAF:'South Africa', KOR:'South Korea', ESP:'Spain', LKA:'Sri Lanka',
  SDN:'Sudan', SUR:'Suriname', SWE:'Sweden', CHE:'Switzerland', SYR:'Syria', TWN:'Taiwan', TJK:'Tajikistan',
  TZA:'Tanzania', THA:'Thailand', TGO:'Togo', TTO:'Trinidad and Tobago', TUN:'Tunisia', TUR:'Turkey',
  UGA:'Uganda', UKR:'Ukraine', ARE:'United Arab Emirates', GBR:'United Kingdom', USA:'United States', URY:'Uruguay',
  UZB:'Uzbekistan', VEN:'Venezuela', VNM:'Vietnam', YEM:'Yemen', ZMB:'Zambia', ZWE:'Zimbabwe',
}

export function nameFromISO3(code: string) {
  return ISO3_TO_NAME[code?.toUpperCase()] ?? code?.toUpperCase() ?? 'Unknown'
}
