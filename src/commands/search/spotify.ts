import { Command } from '../../wrap/builder';

export default Command(
  'spotify [...query]',
  {
    args: (self) => ({
      query: self.string(),
    }),
  },
  async (context, args) => {
    
  }
);
