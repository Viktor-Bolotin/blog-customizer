import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';

import './styles/index.scss';
import styles from './styles/index.module.scss';
import {
	ArticleStateType,
	defaultArticleState,
} from './constants/articleProps';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [selectOptions, setSelectOptions] = useState(defaultArticleState);

	const handleClickApply = (newOptions: ArticleStateType) => {
		setSelectOptions(newOptions);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': selectOptions.fontFamilyOption.value,
					'--font-size': selectOptions.fontSizeOption.value,
					'--font-color': selectOptions.fontColor.value,
					'--container-width': selectOptions.contentWidth.value,
					'--bg-color': selectOptions.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm onApply={handleClickApply} />
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
