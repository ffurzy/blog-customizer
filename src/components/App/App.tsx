import { useState, useEffect } from 'react';
import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from '../../constants/articleProps';
import styles from '../../styles/index.module.scss';

const updateCSSVariables = (state: ArticleStateType) => {
	document.documentElement.style.setProperty(
		'--font-family',
		state.fontFamilyOption.value
	);
	document.documentElement.style.setProperty(
		'--font-size',
		state.fontSizeOption.value
	);
	document.documentElement.style.setProperty(
		'--font-color',
		state.fontColor.value
	);
	document.documentElement.style.setProperty(
		'--container-width',
		state.contentWidth.value
	);
	document.documentElement.style.setProperty(
		'--bg-color',
		state.backgroundColor.value
	);
};

export const App = () => {
	const [settings, setSettings] = useState(defaultArticleState);

	useEffect(() => {
		updateCSSVariables(settings);
	}, [settings]);
	const handleApply = (newSettings: ArticleStateType) => {
		setSettings(newSettings);
	};

	return (
		<main className={styles.main}>
			<ArticleParamsForm currentSettings={settings} onApply={handleApply} />
			<Article />
		</main>
	);
};
