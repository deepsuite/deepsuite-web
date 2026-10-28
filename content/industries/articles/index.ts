import type { IndustryArticle } from '../types'
import { foodRestaurants } from './food-restaurants'
import { foodSalons } from './food-salons'
import { healthcareAdministration } from './healthcare-administration'
import { manufacturingDiscrete } from './manufacturing-discrete'
import { professionalConsulting } from './professional-consulting'
import { realEstatePropertyManagement } from './real-estate-property-management'
import { retailElectronics } from './retail-electronics'
import { retailFashion } from './retail-fashion'
import { travelTourOperators } from './travel-tour-operators'
import { wholesaleFmcg } from './wholesale-fmcg'

/** Published, in-depth industry analyses. Only these pages are indexed. */
export const industryArticles: IndustryArticle[] = [
  retailElectronics,
  retailFashion,
  foodRestaurants,
  foodSalons,
  realEstatePropertyManagement,
  manufacturingDiscrete,
  travelTourOperators,
  wholesaleFmcg,
  healthcareAdministration,
  professionalConsulting,
]
