import { useEffect, useState, useRef } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { Text } from 'src/ui/text';
import { RadioGroup } from 'src/ui/radio-group';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';
import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';

export const ArticleParamsForm = ({
	currentSettings,
	onApply,
}: {
	currentSettings: ArticleStateType;
	onApply: (s: ArticleStateType) => void;
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [formState, setFormState] = useState(currentSettings);
	const containerRef = useRef<HTMLDivElement>(null);

	const handleToggle = () => {
		setIsOpen((prev) => !prev);
	};

	//закрываем при клике вне формы

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				containerRef.current &&
				!containerRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		} else {
			document.removeEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	const handleApply = () => {
		onApply(formState);
		setIsOpen(false);
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		onApply(defaultArticleState);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleToggle} />
			{isOpen && (
				<aside
					ref={containerRef}
					className={clsx(styles.container, {
						[styles.container_open]: isOpen,
					})}>
					<form className={styles.form}>
						<Text
							as={'h2'}
							size={31}
							weight={800}
							fontStyle='normal'
							uppercase={true}
							align='left'
							family='open-sans'>
							Задайте параметры
						</Text>
						<Select
							title='Шрифт'
							options={fontFamilyOptions}
							selected={formState.fontFamilyOption}
							onChange={(option) =>
								setFormState({ ...formState, fontFamilyOption: option })
							}
						/>
						<RadioGroup
							name='Размер шрифта'
							title='Размер шрифта'
							options={fontSizeOptions}
							selected={formState.fontSizeOption}
							onChange={(option) =>
								setFormState({ ...formState, fontSizeOption: option })
							}
						/>
						<Select
							title='Цвет шрифта'
							options={fontColors}
							selected={formState.fontColor}
							onChange={(option) =>
								setFormState({ ...formState, fontColor: option })
							}
						/>
						<Select
							title='Цвет фона'
							options={backgroundColors}
							selected={formState.backgroundColor}
							onChange={(option) =>
								setFormState({ ...formState, backgroundColor: option })
							}
						/>
						<Select
							title='Ширина контента'
							options={contentWidthArr}
							selected={formState.contentWidth}
							onChange={(option) =>
								setFormState({ ...formState, contentWidth: option })
							}
						/>

						<div className={styles.bottomContainer}>
							<Button
								title='Сбросить'
								htmlType='reset'
								type='clear'
								onClick={handleReset}
							/>
							<Button
								title='Применить'
								htmlType='submit'
								type='apply'
								onClick={handleApply}
							/>
						</div>
					</form>
				</aside>
			)}
		</>
	);
};
