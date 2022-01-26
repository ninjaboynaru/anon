import React from 'react';
import propTypes from 'prop-types';
import LoadingIcons from 'react-loading-icons';
import withNavigate from './withNavigate';
import ScreenContainer from './ScreenContainer';
import Button from './Button';
import api from './api';

const maxCharCount = 300;
const minCharCount = 4;

class CreatePostScrene extends React.Component {
	constructor() {
		super();

		this.state = { text: '', loading: false, textError: false, submitError: false };
		this.onTextChange = this.onTextChange.bind(this);
		this.submit = this.submit.bind(this);
		this.cancel = this.cancel.bind(this);
	}

	onTextChange(event) {
		this.setState({ text: event.target.value });
	}

	submit() {
		const { text } = this.state;

		if (text.length < minCharCount || text.length > maxCharCount) {
			return this.setState({ textError: true, submitError: false });
		}

		this.setState({ loading: true });
		api.createPost(this.state.text).then(
			() => {
				this.props.navigate(-1);
			},
			() => {
				this.setState({ loading: false, submitError: true });
			}
		);
	}

	cancel() {
		this.props.navigate(-1);
	}

	render() {
		const { text, loading, textError, submitError } = this.state;
		let errorMessage;
		let loadingIcon;

		if (loading) {
			loadingIcon = <LoadingIcons.BallTriangle stroke="#724ed0" />;
		}

		if (textError) {
			errorMessage = 'Too much or to little text';
		}
		else if (submitError) {
			errorMessage = 'We could not submit your post at this time. Try agian later';
		}

		return (
			<ScreenContainer>
				<div className="create-post__container">
					<div className="create-post__controls">
						<Button secondary disabled={loading} onClick={this.submit}>Submit</Button>
						<Button secondary disabled={loading} onClick={this.cancel}>Cancel</Button>
					</div>
					<textarea onChange={this.onTextChange} value={text} disbaled={loading ? 'true' : undefined} placeholder="Say something..." className="create-post__input" />
					<div className="create-post__input-info">
						<span className="create-post__input-info__count">{`${this.state.text.length} of ${maxCharCount}`}</span>
						<span className="create-post__input-info__error">{errorMessage}</span>
					</div>
					{loadingIcon}
				</div>
			</ScreenContainer>
		);
	}
}

CreatePostScrene.propTypes = {
	navigate: propTypes.func.isRequired
};

export default withNavigate(CreatePostScrene);
