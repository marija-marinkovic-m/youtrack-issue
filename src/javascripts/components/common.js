import styled from 'styled-components';
import { Well } from '@zendeskgarden/react-notifications';
import { Dots } from '@zendeskgarden/react-loaders';

export const StyledSpacer = styled.div`
  height: ${p => p.theme.space.md};
`;

export const Card = styled(Well)`
  padding: ${p => p.theme.space.sm};
`;

export const ButtonDots = styled(Dots)`
  margin-left: ${p => p.theme.space.sm};
`;