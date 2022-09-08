import { ExtractJwt, Strategy } from "passport-jwt";

const option = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.VERIFY_KEY,
};

export const passportInit = (passport, userRepository) => {
  passport.use(
    new Strategy(option, async (jwtPayload, done) => {
      try {
        const user = await userRepository.find({ email: jwtPayload.email });
        if (!user) {
          return done(null, false);
        }
        return done(null, user);
      } catch (err) {
        return done(err, false);
      }
    })
  );
};
