import { documentBase } from '@/schema/base';
import { singleImageURL } from '@/schema/components/image';
import { nameEN, namei18n } from '@/schema/components/name';

export const country = documentBase.merge(singleImageURL).merge(namei18n).merge(nameEN);
