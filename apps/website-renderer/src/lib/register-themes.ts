import { registerTheme } from './theme-registry';
import { themeComponents as adventureBold } from '@hamrotourist/theme-adventure-bold';
import { themeComponents as sereneJourney } from '@hamrotourist/theme-serene-journey';
import { themeComponents as heritageClassic } from '@hamrotourist/theme-heritage-classic';

registerTheme('adventure-bold', adventureBold as any);
registerTheme('serene-journey', sereneJourney as any);
registerTheme('heritage-classic', heritageClassic as any);
